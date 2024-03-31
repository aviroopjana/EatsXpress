import { cuisineList } from "@/config/restaurant-config";
import { Checkbox } from "./ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deselectCuisine, selectCuisine } from "@/redux/restaurant/cuisineSlice";

const CuisineSection = () => {

  const { selectedCuisines} = useSelector((state: RootState) => state.cuisine);

  const dispatch = useDispatch();

  const handleCheckboxChange = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      dispatch(deselectCuisine(cuisine));
    } else {
      dispatch(selectCuisine(cuisine));
    }
  };

  console.log("Selected Cuisines:", selectedCuisines);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {cuisineList.map((cuisine, index) => (
          <div
            key={index}
            className="flex flex-row items-center space-x-1 space-y-0 mt-2"
          >
            <Checkbox
              className="bg-white"
              checked={selectedCuisines.includes(cuisine)}
              onCheckedChange={() => handleCheckboxChange(cuisine)}
            />
            <label className="text-sm font-normal">{cuisine}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisineSection;
