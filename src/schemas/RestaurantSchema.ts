import * as z from "zod";

const RestaurantSchema = z.object({
  restaurantName: z.string(),
  location: z.string(),
  owner: z.string(),
  estimatedDeliveryTime: z.number(),
  deliveryPrice: z.number(),
  imageUrl: z.string(),
  cuisines: z.array(z.string()),
  menu: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      price: z.number(),
    })
  ),
});

export type RestaurantData = z.infer<typeof RestaurantSchema>;
export { RestaurantSchema };
