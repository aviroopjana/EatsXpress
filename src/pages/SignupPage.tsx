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
import { Link } from "react-router-dom";
import React, { useState } from "react";

type AccountType = "personal" | "family" | "business";

interface FormDataTypes {
  name: string;
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    username: "",
    email: "",
    password: "",
    accountType: "personal",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleAccountTypeChange = (value: AccountType) => {
    setFormData({ ...formData, accountType: value });
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="md:h-[700px] max-w-6xl mx-auto">
        <div className=" flex items-center justify-center md:p-10 py-4">
          {/* Sign up form*/}
          <form onSubmit={handleSubmit} className=" md:w-[600px] md:h-[500px]">
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
              <CardContent>
                {/* <form onSubmit={handleSubmit}> */}
                <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter a unique username"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Account Type</Label>
                    <Select
                      onValueChange={(value: AccountType) => handleAccountTypeChange(value)}
                    >
                      <SelectTrigger id="accountType">
                        <SelectValue placeholder="Select an account type" />
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
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Address Line 1</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter your Pincode"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* </form> */}
              </CardContent>
              <CardFooter className="flex flex-col justify-center items-center gap-2">
                <Button className="w-full" type="submit" variant={"default"}>
                  Register
                </Button>
                <div className="flex items-center">
                  <span className="mx-4">OR</span>
                </div>
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
