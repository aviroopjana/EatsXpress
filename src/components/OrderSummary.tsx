import { Restaurant } from "@/types";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/cart/cartSlice";
import { cartItem } from "@/pages/DetailsPage";
import CheckOutButton from "./CheckOutButton";
import { useCreateCheckoutSession } from "@/api/order_api";

type Props = {
  restaurant: Restaurant;
};

const OrderSummary = ({ restaurant }: Props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const userFormData = useSelector((state: RootState) => state.checkOutForm); 

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const getTotalCost = () => {
    if (!cartItems) {
      return 0;
    }

    return cartItems.reduce(
      (total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveFromCart = (item: cartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = () => {
    const checkoutSessionRequest = {
      cartItems: cartItems.map(item => ({
        menuItemId: item._id, 
        name: item.name,
        quantity: Number(item.quantity),
        restaurantId: item.restaurantId
      })),
      deliveryDetails: userFormData,
      restaurantId: restaurant._id,
    };

    createCheckoutSession(checkoutSessionRequest);

    console.log('checkoutSessionRequest:', checkoutSessionRequest);
  };

  return (
    <div className="">
    <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost() + restaurant.deliveryPrice}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => handleRemoveFromCart(item)}
              />
              ₹{((item.price * item.quantity)).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <CheckOutButton
          disabled={cartItems.length === 0}
          onCheckout={handleCheckout}
          isLoading={isCheckoutLoading}
        />
      </CardFooter>
    </div>
  );
};

export default OrderSummary;
