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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice";
import OAuth from "@/components/OAuth";
import { toast } from "sonner";
import {
  setRestaurantFailure,
  setRestaurantStart,
  setRestaurantSuccess,
} from "@/redux/restaurant/restaurantSlice";
import { selectCuisine } from "@/redux/restaurant/cuisineSlice";
import { addMenuItem } from "@/redux/restaurant/menuSlice";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { error: errorMessage, loading } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const fetchRestaurant = async () => {
    try {
      dispatch(setRestaurantStart());
      const res = await fetch("/api/my_restaurant/getRestaurant", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(setRestaurantFailure(data.message));
        // toast.error(data.message);
      } else {
        dispatch(setRestaurantSuccess(data.restaurantDetails));
        dispatch(selectCuisine(data.restaurantDetails.cuisines));
        dispatch(addMenuItem(data.restaurantDetails.menu));
        console.log(data);
        // toast.success("Restaurant details get successfully!", { duration: 3000 });
      }
    } catch (error) {
      dispatch(setRestaurantFailure(error as string));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(
          signInFailure(
            errorData.message || "An error occurred during sign-in."
          )
        );
        toast.error(errorMessage);
      } else {
        const userData = await res.json();
        console.log(userData);
        dispatch(signInSuccess(userData));
        toast.success("Login Successful!", { duration: 4000 });
        fetchRestaurant();
        // if (userData.accountType === 'business') {
        //   dispatch(updateRestaurantId(userData.restaurantId));
        // }
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error as string));
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="min-h-screen max-w-6xl mx-auto">
        <div className=" flex items-center justify-center md:p-10 py-4">
          {/* Sign up form*/}
          <form className="md:w-[400px] md:h-[500px]" onSubmit={handleSubmit}>
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
                <div className="flex flex-col w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label>Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter a your username"
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
                </div>
              </CardContent>
              <CardFooter className="flex flex-col justify-center items-center gap-2">
                <Button className="w-full" type="submit" variant={"default"}>
                  {loading ? (
                    <AiOutlineLoading className="h-4 w-4" />
                  ) : (
                    <span className="text-[15px]">Sign In</span>
                  )}
                </Button>
                <div className="flex items-center">
                  <span className="mx-4">OR</span>
                </div>
                <OAuth />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
