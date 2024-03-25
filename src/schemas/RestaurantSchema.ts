import * as z from "zod";

const MenuSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

const CuisineSchema = z.object({
  cuisines: z.array(z.string()),
});

const RestaurantSchema = z.object({
  restaurantName: z.string(),
  location: z.string(),
  owner: z.string().optional(),
  estimatedDeliveryTime: z.number(),
  deliveryPrice: z.number(),
  imageUrl: z.string(),
  cuisines: CuisineSchema.optional(),
  menu: z.array(MenuSchema).optional(),
});

export type RestaurantData = z.infer<typeof RestaurantSchema>;
export type MenuData = z.infer<typeof MenuSchema>;
export type cuisineData = z.infer<typeof CuisineSchema>;
export { RestaurantSchema, MenuSchema, CuisineSchema };
