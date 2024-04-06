export type MenuItem = {
  productId: string;
  name: string;
  description: string;
  price: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Restaurant = {
  _id: string;
  restaurantName: string;
  location: string;
  owner: string;
  estimatedDeliveryTime: number;
  deliveryPrice: number;
  imageUrl: string;
  cuisines: string[];
  menu: MenuItem[];
  createdAt: string;
  updatedAt: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
