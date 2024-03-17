import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "@/components/OAuth";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SignupFormData, SignupSchema } from "@/schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type accountTypes = "personal" | "family" | "business";

const SignupPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupSchema) });

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAccountTypeChange = (value: accountTypes) => {
    setAccountType(value);
    setValue("accountType", value); // Update accountType value in form state
    trigger("accountType"); // Trigger validation for accountType
  };

  // const handleAccountTypeChange = (value: AccountType) => {
  //   setFormData({ ...formData, accountType: value });
  //   console.log(formData);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  // };

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast.success("Registered Successfully!", { duration: 4000 });
        navigate("/sign-in");
      } else {
        // setErrorMessage(data.message);
        toast.error("Please provide all the neccessary details", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="md:h-[950px] max-w-6xl mx-auto">
        <div className=" flex items-center justify-center md:p-10 py-4">
          {/* Sign up form*/}
          <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className=" md:w-[600px] md:h-[500px]">
            <Card className="relative z-50 md:bg-white md:bg-opacity-80 md:backdrop-filter md:backdrop-blur-md shadow-xl">
              <CardHeader className="flex flex-row gap-2">
                <div>
                  <img src={logo} alt="logo" className="h-20 w-20" />
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <CardTitle>SignUp to EatsExpress</CardTitle>
                  <CardDescription>
                    by filling these details below
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="-mt-4">
                <p className="text-xs font-medium text-zinc-500">
                  * All fields are mandatory, however you can always change your information by visiting your profile
                </p>
              </CardFooter>
              <CardContent>
                {/* <form onSubmit={handleSubmit}> */}
                <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...register("name")}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter a unique username"
                      {...register("username")}
                    />
                    {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                    />
                    {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Account Type</Label>
                    <Select
                      {...register("accountType")}
                      value={accountType}
                      onValueChange={handleAccountTypeChange}
                    >
                      <SelectTrigger id="accountType" >
                        <SelectValue placeholder="Select an account type" />
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
                    <Label>* Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Address Line 1</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      {...register("address")}
                    />
                    {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      {...register("city")}
                    />
                    {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>* Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter your Pincode"
                      {...register("pincode")}
                    />
                    {errors.pincode && <span className="text-xs text-red-500">{errors.pincode.message}</span>}
                  </div>
                </div>
                {/* </form> */}
              </CardContent>
              <CardFooter className="flex flex-col justify-center items-center gap-2">
                <Button
                  className="w-full text-[15px]"
                  type="submit"
                  variant={"default"}
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading className="h-4 w-4" />
                  ) : (
                    <span className="text-[15px]">Sign Up</span>
                  )}
                </Button>
                <div className="flex items-center">
                  <span className="mx-4">OR</span>
                </div>
                <OAuth />
                <div className="flex flex-row gap-2">
                  <p className="text-gray-500 dark:text-gray-300 font-medium">
                    Already have an account?
                  </p>
                  <Link className="font-medium" to={"/sign-in"}>
                    Sign In
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
