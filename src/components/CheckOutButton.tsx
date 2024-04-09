import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  disabled: boolean;
};

const CheckOutButton = ({ disabled}: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="bg-orange-500 hover:bg-orange-800 flex-1"
        >
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        {/* <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        /> */}
        <DialogHeader className="text-2xl font-bold mb-4">
          Confirm Delivery Details
          <p className="text-sm font-normal text-muted-foreground">
            view and change your profile information if needed
          </p>
        </DialogHeader>
        <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              defaultValue={currentUser?.name}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={currentUser?.email}
              placeholder="Enter your email address"
              disabled={true}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              defaultValue={currentUser?.phone}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Address Line 1</Label>
            <Input
              id="address"
              placeholder="Enter your address"
              defaultValue={currentUser?.address}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              defaultValue={currentUser?.city}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Pincode</Label>
            <Input
              id="pincode"
              placeholder="Enter your Pincode"
              defaultValue={currentUser?.pincode}
            />
          </div>
          <div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Continue to payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutButton;
