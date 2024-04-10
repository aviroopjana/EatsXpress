import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useGetMyOrders = () => {
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(`/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
    restaurantId: string; 
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    phone: string;
    addressLine1: string;
    pincode: string;
    city: string;
  };
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const response = await fetch(
      `/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest, {
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};