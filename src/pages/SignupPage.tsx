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

const SignupPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="md:h-[700px] max-w-6xl mx-auto">
        <div className=" flex items-center justify-center md:p-10 py-4">
          {/* Sign up form*/}
          <div className=" md:w-[600px] md:h-[500px]">
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
                <form>
                  <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Name</Label>
                      <Input id="name" placeholder="Enter your full name" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Username</Label>
                      <Input id="name" placeholder="Enter a unique username" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Email</Label>
                      <Input
                        id="name"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Account Type</Label>
                      <Select>
                        <SelectTrigger id="account-type">
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Personal</SelectItem>
                          <SelectItem value="sveltekit">Family</SelectItem>
                          <SelectItem value="astro">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Phone Number</Label>
                      <Input id="name" placeholder="Enter your phone number" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Address Line 1</Label>
                      <Input id="name" placeholder="Enter your address" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>City</Label>
                      <Input id="name" placeholder="Enter your city" />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Pincode</Label>
                      <Input id="name" placeholder="Enter your Pincode" />
                    </div>
                  </div>
                </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
