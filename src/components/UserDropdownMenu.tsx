import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { signoutSuccess } from "../redux/user/userSlice";
import { toast } from "sonner";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRestaurantMenu } from "react-icons/md";

interface UserDropdownMenuProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const UserDropdownMenu: FC<UserDropdownMenuProps> = ({
  isOpen,
  toggleDropdown,
}) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        toast.success("Signout Successful!", { duration: 4000 });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
      <DropdownMenuTrigger asChild>
        <Avatar onClick={toggleDropdown} className="hover: cursor-pointer">
          <AvatarImage alt="@shadcn" src={currentUser?.profilePicture} />
          <AvatarFallback>XX</AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-amber-100">
        <div className="p-4">
          <div className="flex flex-row items-center justify-start gap-5">
            <span className="font-bold text-lg">{currentUser?.username}</span>

            {currentUser?.accountType && (
              <Badge
                className="h-6 w-18 flex items-center bg-rose-950 hover:bg-orange-800"
                variant="default"
              >
                {currentUser.accountType}
              </Badge>
            )}
          </div>
          <span className="text-sm">{currentUser?.email}</span>
          <DropdownMenuSeparator className="my-2" />
          <div className="flex flex-col gap-1">
            <DropdownMenuItem asChild>
              <Link
                className="w-full text-left py-2 hover:cursor-pointer flex flex-row gap-4 font-semibold"
                to={"/user-profile"}
              >
                User Profile
                <CgProfile size={20} />
              </Link>
            </DropdownMenuItem>
            {currentUser?.accountType === "business" && (
              <DropdownMenuItem asChild>
                <Link
                  className="w-full text-left py-2 hover:cursor-pointer flex flex-row gap-2 font-semibold"
                  to={"/manage-restaurant"}
                >
                  Manage Restaurant
                  <MdOutlineRestaurantMenu size={20}/>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Button
                className="w-full text-left py-2 hover:cursor-pointer flex flex-row gap-2 justify-start"
                variant="ghost"
                onClick={handleSignout}
              >
                Logout
                <BiLogOut size={20} />
              </Button>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
