import { RestaurantSchema } from '@/schemas/RestaurantSchema';
import React, { useState } from 'react';
import { z } from 'zod';

export type MenuItem = z.infer<typeof RestaurantSchema>['menu'][number];

interface MenuSectionProps {
  onSubmitMenuItem: (menuItem: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onSubmitMenuItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const menuItem: MenuItem = {
      _id: '', // Generate a unique ID as needed
      name: itemName,
      description: itemDescription || undefined,
      price: parseFloat(itemPrice),
    };
    onSubmitMenuItem(menuItem);
    // Reset form fields
    setItemName('');
    setItemDescription('');
    setItemPrice('');
  };

  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-serif font-semibold text-red-950">
          Menu
        </h1>
        <p className="text-sm text-muted-foreground text-slate-600">
          Create your menu and give each item a name and a price
        </p>
      </div> */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className='flex flex-row items-center justify-start gap-2'>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Item Price"
          step="0.01"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          required
        />
        </div>
        <button
          type="submit"
          className="bg-red-950 text-white rounded-lg px-4 py-2 mt-2 text-sm font-semibold"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default MenuSection;
