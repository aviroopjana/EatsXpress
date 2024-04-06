import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
//   addToCart: () => void;
};

const MenuItemComponent = ({ menuItem }: Props) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle className="font-bold">{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-3">
        <div className="text-slate-600 font-semibold">
            {menuItem.description}
        </div>
        <div>
        ₹{(menuItem.price).toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemComponent;