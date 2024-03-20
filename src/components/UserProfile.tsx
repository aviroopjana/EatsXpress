import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import logo from "../assets/logo.png";
import { RootState } from "@/redux/store";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button } from "./ui/button";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { toast } from "sonner";
import { updateStart, updateFailure, updateSuccess } from "@/redux/user/userSlice";
import { UpdateFormData, UpdateFormSchema } from "@/schemas/UpdateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { AiOutlineLoading } from "react-icons/ai";

type accountTypes = "personal" | "family" | "business";

const UserProfile = () => {
  const { currentUser }: RootState["user"] = useSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<UpdateFormData>({ resolver: zodResolver(UpdateFormSchema), defaultValues: {
    name: currentUser?.name || '',
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      accountType: currentUser?.accountType || '', 
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      pincode: currentUser?.pincode || '',
      profilePicture: currentUser?.profilePicture || '',
  }});

  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError ] = useState<string | null>(null);

  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("");

  const handleAccountTypeChange = (value: accountTypes) => {
    setAccountType(value);
    setValue("accountType", value); 
    trigger("accountType"); 
  };

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
            setValue("profilePicture", downloadURL);
          });
          toast.success('Profile Picture uploaded successfully')
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof UpdateFormSchema>) => {
    if(!currentUser) {
      console.log('currentUser is null');
      return;
    }
    console.log("Current user:", currentUser);
    const formValuesChanged = Object.keys(values).some(
      key => {
        console.log("Current value:", values[key as keyof typeof values]);
            console.log("Initial value:", currentUser[key as keyof typeof currentUser]);
            console.log("Comparison result:", values[key as keyof typeof values] !== currentUser[key as keyof typeof currentUser]);
            return values[key as keyof typeof values] !== currentUser[key as keyof typeof currentUser];
      }
  );

  setUpdateUserError(null);
  setUpdateUserSuccess(null);

  if (!formValuesChanged) {
      setUpdateUserError('No changes made');
      toast.error('No changes made', { duration: 3000 });
      return;
  }

    try {
      dispatch(updateStart());
      setLoading(true);
      const res = await fetch(`/api/user/updateUser/${currentUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        toast.error(updateUserError, {duration: 3000});
        setLoading(false);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User updated successfully!!");
        toast.success(updateUserSuccess, {duration: 3000})
        setLoading(false);
      }
    } catch (error) {
      dispatch(updateFailure((error as Error).message));
      setUpdateUserError((error as Error).message);
      toast.error(updateUserError, {duration: 3000});
      setLoading(false);
    }
  };

  return (
    <div className="h-auto p-8 md:py-14 inset-0 flex justify-center items-center top-0 z-[-2] w-screen bg-[radial-gradient(#4c0519_1px,#fdd752_1px)] bg-[size:20px_20px]">
      <div className="max-w-4xl w-full p-8 mx-auto backdrop-filter backdrop-blur-md rounded-2xl shadow-xl py-10 overflow-hidden border-t-4 border-t-red-950">
        <h1 className="text-3xl font-semibold text-center ">
          Personal Information
        </h1>
        <form className="text-orange-950" onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
          <Input
            type="file"
            accept="image/*"
            {...register('profilePicture')}
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
            hidden
          />
          <div
            className="relative h-32 w-32 mx-auto my-3 cursor-pointer"
            onClick={() => filePickerRef.current?.click()}
          >
            {imageFileUploadProgress !== null && (
              <CircularProgressbar
                value={imageFileUploadProgress}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              alt=""
              src={imageFileURL || currentUser?.profilePicture}
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
            {errors.profilePicture && <span className="text-xs text-red-500">{errors.profilePicture.message}</span>}
          </div>
          <p className="flex items-center justify-center mb-6 font-semibold text-sm">
            *Change your photo by clicking on the avatar above*
          </p>
          <Card className="relative z-50 md:bg-opacity-80 md:backdrop-filter md:backdrop-blur-md shadow-xl text-red-950">
            <CardHeader className="flex flex-row gap-2 items-center justify-start">
              <div>
                <img src={logo} alt="logo" className="h-20 w-20" />
              </div>
              <div className="flex flex-col items-center justify-center gap-1 md:ml-32 md:text-lg">
                <CardTitle>
                  Welcome to your profile, update details if required
                </CardTitle>
                <CardDescription>
                  by filling these details below
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {/* <form onSubmit={handleSubmit}> */}
              <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    defaultValue={currentUser?.name}
                    {...register('name')}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter a unique username"
                    defaultValue={currentUser?.username}
                    {...register('username')}
                  />
                  {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={currentUser?.email}
                    placeholder="Enter your email address"
                    {...register('email')}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Account Type</Label>
                  <Select
                  onValueChange={handleAccountTypeChange}
                  {...register('accountType')}
                  value={accountType}
                  >
                    <SelectTrigger
                      id="accountType"
                      defaultValue={currentUser?.accountType}
                    >
                      <SelectValue placeholder={currentUser?.accountType} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.accountType && <span className="text-xs text-red-500">{errors.accountType.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    defaultValue={currentUser?.phone}
                    {...register('phone')}
                  />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Address Line 1</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    defaultValue={currentUser?.address}
                    {...register('address')}
                  />
                  {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    defaultValue={currentUser?.city}
                    {...register('city')}
                  />
                  {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter your Pincode"
                    defaultValue={currentUser?.pincode}
                    {...register('pincode')}
                  />
                  {errors.pincode && <span className="text-xs text-red-500">{errors.pincode.message}</span>}
                </div>
              </div>
              {/* </form> */}
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-2">
              <Button
                className="w-[120px] text-[15px] bg-red-950 text-white hover:bg-red-800"
                type="submit"
                variant={"secondary"}
                disabled={loading}
              >
                {loading ? (
                    <AiOutlineLoading className="h-4 w-4" />
                  ) : (
                    <span className="text-[15px]">Update</span>
                  )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
