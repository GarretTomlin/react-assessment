import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import MenuItem from "./MenuItems";

interface MenuProps {
  onItemClick: (label: string) => void;
  selectedItem: string;
}

const Menu: React.FC<MenuProps> = ({ onItemClick, selectedItem }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode<{ name: string }>(accessToken);
      setUserName(decodedToken.name);
    }
  }, []);

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
        {userName && (
          <MenuItem
            label={userName}
            isSelected={selectedItem === userName}
            onClick={() => onItemClick(userName)}
            className="ml-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
