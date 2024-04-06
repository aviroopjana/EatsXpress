import { useGetRestaurant } from "@/api/restaurant_api";
import MenuItemComponent from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

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
          <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
              <RestaurantInfo restaurant={restaurant} />
              <span className="text-2xl font-bold tracking-tight">Menu</span>
              {restaurant.menu &&
                restaurant.menu.map((menuItem) => (
                  <MenuItemComponent
                    menuItem={menuItem}
                    //   addToCart={() => addToCart(menuItem)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
