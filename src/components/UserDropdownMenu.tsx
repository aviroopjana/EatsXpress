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
        toast.success('Signout Successful!', {duration: 4000});
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
      <DropdownMenuContent className="w-56">
        <div className="p-4">
          <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-lg">{currentUser?.username}</span>

            {currentUser?.accountType && (
              <Badge
                className="mr-8 h-6 w-18 flex items-center"
                variant={"secondary"}
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
                className="block w-full text-left py-2 hover:bg-gray-100 hover:cursor-pointer"
                to={'/user-profile'}
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className="block w-full text-left py-2 hover:cursor-pointer"
                variant="ghost"
                onClick={handleSignout}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
