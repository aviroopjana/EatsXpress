import * as z from "zod";

const MenuSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
  });


const RestaurantSchema = z.object({
  restaurantName: z.string(),
  location: z.string(),
  owner: z.string(),
  estimatedDeliveryTime: z.number(),
  deliveryPrice: z.number(),
  imageUrl: z.string(),
  cuisines: z.array(z.string()),
  menu: z.array(MenuSchema),
});

export type RestaurantData = z.infer<typeof RestaurantSchema>;
export type MenuData = z.infer<typeof MenuSchema>;
export { RestaurantSchema, MenuSchema };
