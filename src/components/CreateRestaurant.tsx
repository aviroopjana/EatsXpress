import { TfiThought } from "react-icons/tfi";
import logo from "@/assets/logo.png";
import { Label } from "./ui/label";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { RootState } from "@/redux/store";
import { z } from "zod";
import { Button } from "./ui/button";
import { FaCamera } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { cuisineList } from "@/config/restaurant-config";
import MenuSection from "./MenuSection";
import {
  setRestaurantFailure,
  setRestaurantStart,
  setRestaurantSuccess,
} from "@/redux/restaurant/restaurantSlice";

const CreateRestaurant = () => {
  const { restaurant } = useSelector((state: RootState) => state.restaurant);
  const { menuItems } = useSelector((state: RootState) => state.menu);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RestaurantData>({ resolver: zodResolver(RestaurantSchema) });

  // console.log("Menu Items:", menuItems);

  const dispatch = useDispatch();

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
          toast.success("Restaurant Image uploaded successfully");
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  const onSubmit = async (
    values: z.infer<typeof RestaurantSchema>,
  ) => {
    console.log("Submitting form:", values);
    try {
      console.log('Submitting form:', values);
      dispatch(setRestaurantStart());
      const {
        restaurantName,
        imageUrl,
        location,
        deliveryPrice,
        estimatedDeliveryTime,
        cuisines,
        owner,
      } = values;

      const restaurantData = {
        restaurantName,
        location,
        estimatedDeliveryTime,
        imageUrl,
        deliveryPrice,
        cuisines,
        menu: menuItems,
        owner,
      };

      const res = await fetch('/api/my_restaurant/createRestaurant', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });
      console.log('restaurant data:', restaurantData)
      const data = await res.json();
      if (!res.ok) {
        dispatch(setRestaurantFailure(data.message));
        toast.error(data.message, { duration: 3000 });
      } else {
        dispatch(setRestaurantSuccess(data));
        toast.success("Restaurant created successfully!", { duration: 3000 });
        console.log('restaurant:', restaurant);
      }
    } catch (error) {
      dispatch(setRestaurantFailure((error as Error).message));
      toast.error((error as Error).message, { duration: 3000 });
    }
  };

  const onError = (errors: FieldErrors<RestaurantData>) => {
    console.log('Form Errors: ', errors)
  }

//   const handleSubmitForm = handleSubmit(onSubmit as SubmitHandler<FieldValues>);
// console.log('handleSubmitForm:', handleSubmitForm);

  return (
    <div className="flex flex-col justify-center items-center max-w-6xl w-full mx-auto">
      <div className="flex flex-row items-center justify-center gap-4 mt-10">
        <h2 className="text-xl font-medium">
          It seems like you haven't created your restaurant yet
        </h2>
        <TfiThought className="size-14" size={25} />
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

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        // onSubmit={handleSubmitForm}
        className="max-w-3xl w-full mx-auto flex"
      >
        <div className="flex flex-col gap-5 w-full">
          {/* Image Section*/}
          <div className="flex flex-col items-center justify-center gap-2 max-w-3xl">
            <Label className="text-xl flex items-center py-6 font-semibold text-slate-800">
              Upload a suitable image for your restaurant{" "}
              <FaCamera className="ml-2 size-10" size={25} />
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
          <Card className="relative z-50 md:bg-opacity-80 md:backdrop-filter md:backdrop-blur-md shadow-xl w-full bg-[#fef3c7]">
            <CardHeader className="flex flex-row items-center justify-center mx-auto">
              <div className="flex flex-col items-center justify-center gap-1 md:text-lg">
                <CardTitle className="text-xl font-serif font-semibold text-red-950">
                  Restaurant Details
                </CardTitle>
                <CardDescription className="text-muted-foreground text-slate-600 text-sm">
                  please fill these necessary information below
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    placeholder="Enter your restaurant name"
                    {...register("restaurantName")}
                    className="border-zinc-400"
                    required
                  />
                  {errors.restaurantName && (
                    <span className="text-xs text-red-500">
                      {errors.restaurantName.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter restaurant location"
                    {...register("location")}
                    required
                    className="border-zinc-400"
                  />
                  {errors.location && (
                    <span className="text-xs text-red-500">
                      {errors.location.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Delivery Time (in mins )</Label>
                  <Input
                    id="estimatedDeliveryTime"
                    type="number"
                    required
                    placeholder="Enter your estimated delivery time (in mins)"
                    {...register("estimatedDeliveryTime", {
                      valueAsNumber: true,
                    })}
                    className="border-zinc-400"
                  />
                  {errors.estimatedDeliveryTime && (
                    <span className="text-xs text-red-500">
                      {errors.estimatedDeliveryTime.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Delivery Charge (in '₹')</Label>
                  <Input
                    id="deliveryPrice"
                    type="number"
                    required
                    placeholder="Enter your delivery charges"
                    {...register("deliveryPrice", { valueAsNumber: true })}
                    className="border-zinc-400"
                  />
                  {errors.deliveryPrice && (
                    <span className="text-xs text-red-500">
                      {errors.deliveryPrice.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-8">
                <Separator className="bg-slate-500" />
              </div>

              {/* Cuisines Section*/}
              <div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-xl font-serif font-semibold text-red-950">
                    Cuisines
                  </h1>
                  <p className="text-sm text-muted-foreground text-slate-600">
                    Please select from the below options
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                  {cuisineList.map((cuisine, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        {...register(`cuisines.${index}`)}
                        id={`cuisine-${index}`}
                      />
                      <label htmlFor={`cuisine-${index}`} className="ml-2">
                        {cuisine}
                      </label>
                    </div>
                  ))}
                  {errors.cuisines && (
                    <span className="text-red-600">
                      At least one cuisine must be selected.
                    </span>
                  )}
                </div>
              </div>

              <div className="my-8">
                <Separator className="bg-slate-500" />
              </div>

              {/*Menu Section */}
              <div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-xl font-serif font-semibold text-red-950">
                    Menu
                  </h1>
                  <p className="text-sm text-muted-foreground text-slate-600">
                    Create your menu and give each item a name and a price
                  </p>
                </div>
                <MenuSection />
              </div>
            </CardContent>
            <div className="my-8">
              <Separator className="bg-slate-500" />
            </div>
            <CardFooter className="flex flex-col justify-center items-center gap-2">
              <Button
                className="w-[120px] text-[15px] bg-red-950 text-white hover:bg-red-800"
                type="submit"
                variant={"secondary"}
                //disabled={loading}
              >
                Create
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateRestaurant;
