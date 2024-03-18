import { TfiThought } from "react-icons/tfi";
import logo from "@/assets/logo.png";
import { Label } from "./ui/label";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import { toast } from "sonner";
import { RestaurantData, RestaurantSchema } from "@/schemas/RestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { RootState } from "@/redux/store";
import { z } from "zod";
import { Button } from "./ui/button";
import { FaCamera } from "react-icons/fa";

const CreateRestaurant = () => {
  const { restaurant } = useSelector((state: RootState) => state.restaurant);

  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
    // trigger
  } = useForm<RestaurantData>({ resolver: zodResolver(RestaurantSchema) });

  //   const [createRestaurantSuccess, setCreateRestaurantSuccess] = useState<string | null>(
  //     null
  //   );
  //   const [updateRestaurantError, setUpdateRestaurantError ] = useState<string | null>(null);

  //   const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (imageFile?.name ?? "");
    const storageRef = ref(storage, fileName);
    if (imageFile) {
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(Number(progress.toFixed(0)));
        },
        () => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
          toast.error(imageFileUploadError?.toString());
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileURL(downloadURL);
            setValue("imageUrl", downloadURL);
          });
          toast.success("Profile Picture uploaded successfully");
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof RestaurantSchema>) => {
    //   setUpdateRestaurantError(null);
    //   setCreateRestaurantSuccess(null);

    try {
      //   dispatch(updateStart());
      const res = await fetch(`/api/user/updateUser/${restaurant?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      //   const data = await res.json();
      if (!res.ok) {
        // dispatch(updateFailure(data.message));
        // setUpdateRestaurantError(data.message);
        // toast.error(updateUserError, {duration: 3000});
      } else {
        // dispatch(updateSuccess(data));
        // setCreateRestaurantSuccess("User updated successfully!!");
        // toast.success(updateUserSuccess, {duration: 3000})
      }
    } catch (error) {
      //   dispatch(updateFailure((error as Error).message));
      //   setUpdateRestaurantError((error as Error).message);
      //   toast.error(updateUserError, {duration: 3000});
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row items-center justify-center gap-4 mt-10">
        <h2 className="text-xl font-medium">
          It seems like you haven't created your restaurant yet
        </h2>
        <TfiThought size={25} />
      </div>
      <h2 className="text-xl mt-2 font-medium text-slate-600">
        No worries, start creating your restaurant by filling the details below
      </h2>
      <div className="mt-8 flex flex-row justify-center items-center md:-ml-16">
        <img src={logo} alt="logo" className="h-20 w-20" />
        <h1 className="text-3xl text-red-950 font-bold">
          Create Your Restaurant
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
        {/* Image Section*/}
        <div className="flex flex-col gap-2">
          <Label className="text-xl flex items-center py-6 ml-6 font-semibold text-slate-800">
            Upload a suitable image for your restaurant{" "}
            <FaCamera className="ml-2" size={25} />
          </Label>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3">
            <Input
              type="file"
              accept="image/*"
              {...register("imageUrl")}
              onChange={handleImageChange}
              ref={filePickerRef}
            />
            <Button onClick={uploadImage}>
              {" "}
              {imageFileUploadProgress ? (
                <div className="h-16 w-16">
                  <CircularProgressbar
                    value={imageFileUploadProgress}
                    text={`${imageFileUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageFileUploadError && toast.error(imageFileUploadError)}
          {imageFileURL && (
            <img
              src={imageFileURL}
              alt="upload"
              className="w-full h-72 object-contain"
            />
          )}
        </div>

        {/* Details Section */}
        <div></div>

        {/* Cuisines Section*/}
        <div>{/* TO DO */}</div>

        {/*Menu Section */}
        <div>{/* TO DO */}</div>
      </form>
    </div>
  );
};

export default CreateRestaurant;
