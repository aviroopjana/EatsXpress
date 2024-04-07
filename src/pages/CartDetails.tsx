import { useGetRestaurant } from "@/api/restaurant_api";
import OrderSummary from "@/components/OrderSummary";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const CartDetails = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="max-w-3xl mx-auto p-5">
        <Card className="bg-[#fef3c7] rounded-xl shadow-2xl border-yellow-600">
            <CardHeader className="text-3xl font-bold text-red-950">Cart Details</CardHeader>
          <OrderSummary restaurant={restaurant} />
          <CardFooter>{/*To Do: Check Out Button */}</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartDetails;
