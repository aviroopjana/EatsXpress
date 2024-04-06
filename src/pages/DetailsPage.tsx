import { useGetRestaurant } from "@/api/restaurant_api";
import MenuItemComponent from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { addToCart } from "@/redux/cart/cartSlice";
import { MenuItem } from "@/types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export type cartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailsPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const dispatch = useDispatch();

  const handleAddToCart = (menuItem: MenuItem) => {
    const cartItem: cartItem = {
      ...menuItem,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  console.log(restaurant);

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="max-w-5xl mx-auto p-5">
        <div className="flex flex-col gap-10">
          <AspectRatio ratio={16 / 5}>
            <img
              className="rounded-md h-full w-full object-cover"
              src={restaurant.imageUrl}
            />
          </AspectRatio>
          <div className="grid md:grid-cols-[4fr_2fr] gap-4">
            <div className="flex flex-col gap-4">
              <RestaurantInfo restaurant={restaurant} />
              <span className="text-2xl font-bold tracking-tight">Menu</span>
              {restaurant.menu &&
                restaurant.menu.map((menuItem) => (
                  <MenuItemComponent
                    menuItem={menuItem}
                    addToCart={() => handleAddToCart(menuItem)}
                  />
                ))}
            </div>
            <div>
              <Card className="bg-[#fef3c7] rounded-xl shadow-2xl border-yellow-600">
                <OrderSummary restaurant={restaurant} />
                <CardFooter>
                 {/*To Do: Check Out Button */}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
