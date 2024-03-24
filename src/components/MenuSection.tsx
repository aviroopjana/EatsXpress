import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MenuData, MenuSchema } from "@/schemas/RestaurantSchema";
import { z } from "zod";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem, removeMenuItem } from "@/redux/restaurant/menuSlice";
import { RootState } from "@/redux/store";
import { v4 as uuidv4 } from 'uuid';

export type MenuItem = z.infer<typeof MenuSchema>;

const MenuSection = () => {
  const {
    register,
    formState: { errors },
  } = useForm<MenuData>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const { menuItems } = useSelector((state: RootState) => state.menu);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [addedItems, setAddedItems] = useState<MenuItem[]>(menuItems);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProductId = uuidv4();
    const menuItem: MenuItem = {
      name: itemName,
      productId: newProductId,
      description: itemDescription || undefined,
      price: parseFloat(itemPrice),
    };
    dispatch(addMenuItem(menuItem));
    // Reset form fields
    setItemName("");
    setItemDescription("");
    setItemPrice("");
    // setAddedItems([...addedItems, menuItem]);
    setAddedItems([...addedItems, { ...menuItem, productId: newProductId }]);
  };

  // const removeItem = (itemToRemove: MenuItem) => {
  //   dispatch(removeMenuItem(itemToRemove.productId));
  //   console.log(menuItems);
  // };

  const removeItem = (productIdToRemove: string) => {
    dispatch(removeMenuItem(productIdToRemove));
    setAddedItems(addedItems.filter(item => item.productId !== productIdToRemove));
  };
  

  return (
    <div>
      <div className="mt-4">
        <div>
          <div className="flex flex-col md:flex-row md:items-start justify-start gap-2">
            <div className="flex flex-col gap-2">
              <Label>Item Name</Label>
              <Input
                type="text"
                placeholder="Enter the item name"
                {...register("name", { required: true })}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border border-zinc-400 rounded-lg"
              />
              {errors.name && (
                <span className="text-red-500">Item name is required</span>
              )}
              <Label>Item Description</Label>
              <Input
                type="text"
                placeholder="Provide a description of the item"
                {...register("description")}
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                className="border border-zinc-400 rounded-lg w-60"
              />
              <Label>Item Price</Label>
              <Input
                type="number"
                placeholder="Enter the item price"
                step="0.5"
                {...register("price", { required: true, valueAsNumber: true })}
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                className="border border-zinc-400 rounded-lg"
              />
              {errors.price && (
                <span className="text-red-500">Item price is required</span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-red-950 text-white rounded-lg px-4 py-2 mt-3 text-sm font-semibold hover:bg-red-800"
            onClick={handleSubmit}
          >
            Add Menu Item
          </Button>
        </div>
      </div>
      {/* Display added items */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Added Items:</h2>
        {addedItems.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-3 mt-2">
            <div className="flex flex-row items-center gap-1">
              <Label>Name:</Label>
              <Input
                className="border border-zinc-400 rounded-lg px-2 py-1 w-32"
                value={item.name}
                readOnly
              />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Label>Description:</Label>
              <Input
                value={item.description}
                className="border border-zinc-400 rounded-lg px-2 py-1 w-72"
                readOnly
              />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Label>Price:</Label>
              <Input
                value={item.price.toString()}
                className="border border-zinc-400 rounded-lg px-2 py-1 w-12"
                readOnly
              />
            </div>
            <Button
              onClick={() => removeItem(item.productId)}
              className="hover:bg-transparent hover:bg-[#fdedaf]"
              variant={"ghost"}
            >
              <FaTrash size={20} color="#93080b"/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
