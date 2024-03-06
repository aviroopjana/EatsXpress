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
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="min-h-screen max-w-6xl mx-auto">
        <div className=" flex items-center justify-center md:p-10 py-4">
          {/* Sign up form*/}
          <div className=" md:w-[400px] md:h-[500px]">
            <Card className="relative z-50 md:bg-white md:bg-opacity-80 md:backdrop-filter md:backdrop-blur-md shadow-xl">
              <CardHeader className="flex flex-row gap-2">
                <div>
                  <img src={logo} alt="logo" className="h-20 w-20" />
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <CardTitle>Welcome back to EatsExpress</CardTitle>
                  <CardDescription>
                    Signin by feeling details below
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Username</Label>
                      <Input id="name" placeholder="Enter a your username" />
                    </div> 
                    <div className="flex flex-col space-y-1.5 w-full">
                      <Label>Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col justify-center items-center gap-2">
                <Button className="w-full" type="submit" variant={"default"}>
                  Sign In
                </Button>
                <div className="flex items-center">
                  <span className="mx-4">OR</span>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="text-gray-500 dark:text-gray-300 font-medium">
                    New to EatsXpress?
                  </p>
                  <Link className="font-medium" to={"/sign-up"}>
                    Register here
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

export default LoginPage;
