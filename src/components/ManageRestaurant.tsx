import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import CreateRestaurant from "./CreateRestaurant";
import UpdateRestaurant from "./UpdateRestaurant";

const ManageRestaurant = () => {

  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="h-[950px] inset-0 flex justify-center items-center top-0 z-[-2] w-screen bg-[radial-gradient(#4c0519_1px,#fdd752_1px)] bg-[size:20px_20px]">
        <div className="max-w-5xl w-full p-8 mx-auto backdrop-filter backdrop-blur-md rounded-2xl shadow-xl py-10 overflow-hidden border-t-4 border-t-red-950"> 
        <h1 className="text-3xl font-semibold text-center ">
          Manage Your Restaurant
        </h1>
        <div className="w-full mx-auto">
          {currentUser?.restaurantId === null ? <CreateRestaurant/> : <UpdateRestaurant/>}
        </div>
        </div>
    </div>
  );
};

export default ManageRestaurant