import { RestaurantSchema } from "@/schemas/RestaurantSchema";
import React, { useState } from "react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type MenuItem = z.infer<typeof RestaurantSchema>["menu"][number];

interface MenuSectionProps {
  onSubmitMenuItem: (menuItem: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onSubmitMenuItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [addedItems, setAddedItems] = useState<MenuItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const menuItem: MenuItem = {
      _id: "", // Generate a unique ID as needed
      name: itemName,
      description: itemDescription || undefined,
      price: parseFloat(itemPrice),
    };
    onSubmitMenuItem(menuItem);
    // Reset form fields
    setItemName("");
    setItemDescription("");
    setItemPrice("");
    // Update added items
    setAddedItems([...addedItems, menuItem]);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row md:items-start justify-start gap-2">
          <div>
            <Label>Item Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter the item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border border-zinc-400 rounded-lg"
              required
            />
          </div>
          <div>
            <Label>Item Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Provide a description of the item"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="border border-zinc-400 rounded-lg w-60"
            />
          </div>
          <div>
            <Label>Item Price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Enter the item price"
              step="0.5"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="border border-zinc-400 rounded-lg"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-red-950 text-white rounded-lg px-4 py-2 mt-3 text-sm font-semibold"
        >
          Add Menu Item
        </button>
      </div>

      {/* Display added items */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Added Items:</h2>
          {addedItems.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 mt-2">
              <div className="flex flex-row items-center">
                <Label>Item Name:</Label>
                <Input
                  className="border border-zinc-400 rounded-lg px-2 py-1 w-32"
                  value={item.name}
                  readOnly
                />
              </div>
              <div className="flex flex-row items-center">
                <Label>Item Description:</Label>
                <Input
                  value={item.description}
                  className="border border-zinc-400 rounded-lg px-2 py-1 w-72"
                  readOnly
                />
              </div>
              <div className="flex flex-row items-center">
                <Label>Item Price:</Label>
                <Input
                  value={item.price}
                  className="border border-zinc-400 rounded-lg px-2 py-1 w-12"
                  readOnly
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuSection;
