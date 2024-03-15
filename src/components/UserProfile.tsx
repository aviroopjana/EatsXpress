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
import { useState, useRef, ChangeEvent, useEffect, FormEvent } from "react";
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

type AccountType = "personal" | "family" | "business";

interface FormDataTypes {
  name: string;
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
  profilePicture: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

const UserProfile = () => {
  const { currentUser }: RootState["user"] = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    username: "",
    email: "",
    password: "",
    accountType: "personal",
    profilePicture: '',
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError ] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAccountTypeChange = (value: AccountType) => {
    setFormData({ ...formData, accountType: value });
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
  console.log(imageFileURL, imageFile);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/updateUser/${currentUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        toast.error(updateUserError, {duration: 3000});
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User updated successfully!!");
        toast.success(updateUserSuccess, {duration: 3000})
      }
    } catch (error) {
      dispatch(updateFailure((error as Error).message));
      setUpdateUserError((error as Error).message);
      toast.error(updateUserError, {duration: 3000});
    }
  };

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
            setFormData({ ...formData, profilePicture: downloadURL });
          });
          toast.success('Profile Picture uploaded successfully')
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  return (
    <div className="h-[950px] inset-0 flex justify-center items-center top-0 z-[-2] w-screen bg-[radial-gradient(#4c0519_1px,#fdd752_1px)] bg-[size:20px_20px]">
      <div className="max-w-4xl w-full p-8 mx-auto backdrop-filter backdrop-blur-md rounded-2xl shadow-xl py-10 overflow-hidden border-t-4 border-t-red-950">
        <h1 className="text-3xl font-semibold text-center ">
          Personal Information
        </h1>
        <form className="text-orange-950" onSubmit={handleSubmit}>
          <Input
            type="file"
            accept="image/*"
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
                    value={currentUser?.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter a unique username"
                    value={currentUser?.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser?.email}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={"*********"}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Account Type</Label>
                  <Select
                  onValueChange={(value: AccountType) =>
                    handleAccountTypeChange(value)
                  }
                  >
                    <SelectTrigger
                      id="accountType"
                      value={currentUser?.accountType}
                    >
                      <SelectValue placeholder={currentUser?.accountType} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={currentUser?.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Address Line 1</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={currentUser?.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    value={currentUser?.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label>Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter your Pincode"
                    value={currentUser?.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* </form> */}
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-2">
              <Button
                className="w-[120px] text-[15px] bg-red-950 text-white hover:bg-red-800"
                type="submit"
                variant={"secondary"}
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
