import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckoutFieldsType } from "@/types";
import { useEffect } from "react";
import { setForm, updateForm } from "@/redux/cart/CheckoutFormSlice";

type Props = {
  onCheckout: (userFormData: CheckoutFieldsType) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckOutButton = ({ disabled, onCheckout, isLoading }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.checkOutForm);

  useEffect(() => {
    if (currentUser) {
      const { name, email, phone, address, city, pincode } = currentUser;
      dispatch(
        setForm({ name, email, phone, addressLine1: address, city, pincode })
      );
    }
  }, [dispatch, currentUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateForm({ [event.target.id]: event.target.value }));
  };

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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Address Line 1</Label>
            <Input
              id="addressLine1"
              placeholder="Enter your address"
              defaultValue={currentUser?.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              defaultValue={currentUser?.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Pincode</Label>
            <Input
              id="pincode"
              placeholder="Enter your Pincode"
              defaultValue={currentUser?.pincode}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => onCheckout(formData)}
              disabled={isLoading}
            >
              Continue to payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutButton;
