import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `/api/restaurant/search/${city}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
