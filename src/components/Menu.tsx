import React from "react";
import MenuItem from "./MenuItems";

interface MenuProps {
  onItemClick: (label: string) => void;
  selectedItem: string;
}

const Menu: React.FC<MenuProps> = ({ onItemClick, selectedItem }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row items-center space-x-1 flex-grow">
        <MenuItem
          label="All Cards"
          isSelected={selectedItem === "All Cards"}
          onClick={() => onItemClick("All Cards")}
          icon="../../icons/allcard.svg"
        />
        <MenuItem
          label="Decks"
          isSelected={selectedItem === "Decks"}
          onClick={() => onItemClick("Decks")}
          icon="../../icons/decks.svg"
        />
        <h3 className="text-2xl font-bold text-gray-800 space-x-4 flex-grow text-center">
          SW-API Deck Builder
        </h3>
      </div>
      <div className="flex">
        <MenuItem
          label="Garret"
          isSelected={selectedItem === "Garret"}
          onClick={() => onItemClick("Garret")}
          className="ml-auto"
        />
      </div>
    </div>
  );
};

export default Menu;
