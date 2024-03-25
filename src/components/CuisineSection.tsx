import { cuisineList } from "@/config/restaurant-config";
import { Checkbox } from "./ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deselectCuisine, selectCuisine } from "@/redux/restaurant/cuisineSlice";
import { useForm } from "react-hook-form";
import { CuisineSchema, cuisineData } from "@/schemas/RestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const CuisineSection = () => {

  const { register, formState: {errors}} = useForm<cuisineData>({resolver: zodResolver(CuisineSchema)});

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
              {...register('cuisines')}
              checked={selectedCuisines.includes(cuisine)}
              // onCheckedChange={(checked) => {
              //   handleCheckboxChange(cuisine);
              //   // Update form state with the selected cuisines
              //   const updatedCuisines = checked
              //     ? [...selectedCuisines, cuisine]
              //     : selectedCuisines.filter((item) => item !== cuisine);
              //   register(`cuisines`, { required: true });
              //   setSelectedCuisines(updatedCuisines);
              // }}
              onCheckedChange={() => handleCheckboxChange(cuisine)}
            />
            <label className="text-sm font-normal">{cuisine}</label>
          </div>
        ))}
        {errors.cuisines && (
          <span className="text-red-600">
            At least one cuisine must be selected.
          </span>
        )}
      </div>
    </div>
  );
};

export default CuisineSection;
