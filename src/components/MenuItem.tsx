import { BiCartAdd } from "react-icons/bi";
import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItemComponent = ({ menuItem, addToCart }: Props) => {

  const { currentUser} = useSelector((state: RootState) => state.user);

  const handleAddToCart = () => {
    if(currentUser) {
      addToCart();
      toast.success("One new item added to the cart successfully!")
    } else {
      toast.info("You must login to add items to the cart!", { duration: 2000, position: 'top-center'})
    }
  }

  return (
    <Card className="cursor-pointer bg-[#fef3c7] shadow-xl border-yellow-500">
      <CardHeader>
        <CardTitle className="font-bold">{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-3">
        <div className="text-slate-600 font-semibold">
            {menuItem.description}
        </div>
          <div className="flex items-center flex-col gap-3">
            ₹{(menuItem.price).toFixed(2)}
            <BiCartAdd size={30} color={"green"} onClick={handleAddToCart}/>
          </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemComponent;