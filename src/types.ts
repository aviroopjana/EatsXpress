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

export type User = {
  _id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  accountType: string;
  restaurantId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

  export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: number;
      restaurantId: string; 
    }[];
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restaurantId: string;
  };

export type CheckoutFieldsType = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  pincode: string;
};
