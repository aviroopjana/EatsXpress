import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import CreateRestaurant from "./CreateRestaurant";
import UpdateRestaurant from "./UpdateRestaurant";
import { Separator } from "./ui/separator";

const ManageRestaurant = () => {

  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="h-auto py-4 md:py-10 inset-0 flex justify-center items-center top-0 z-[-2] w-screen bg-[radial-gradient(#4c0519_1px,#fdd752_1px)] md:bg-[size:20px_20px]">
        <div className="max-w-xl md:max-w-4xl w-[340px] md:w-full py-8 px-4 md:p-8 mx-auto backdrop-filter md:backdrop-blur-md rounded-2xl shadow-xl border-t-4 border-t-red-950 "> 
        <h1 className="text-3xl font-semibold text-center ">
          Manage Your Restaurant
        </h1>
        <Separator className="my-5 bg-red-950 border border-red-900"/>
        <div className="w-full mx-auto">
          {currentUser?.restaurantId === null ? <CreateRestaurant/> : <UpdateRestaurant/>}
        </div>
        </div>
    </div>
  );
};

export default ManageRestaurant