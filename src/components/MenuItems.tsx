import React from "react";

interface MenuItemProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  icon?: string | undefined;
}

const MenuItems: React.FC<MenuItemProps> = ({ label, isSelected, onClick, icon}) => {
  const selectedClass = isSelected ? "bg-white" : "bg-gray-300";

  return (
    <div
      className={`flex  p-2  rounded-md`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
      <button className={`btn hover:bg-transparent ${selectedClass} p-3 w-30 h-10`}>
      <img src={icon} className="w-6 h-6" />
      <div className="text-black ml-2">{label}</div>
        </button>         
      </div>
      {isSelected && (
        <div className="flex items-center gap-3 mt-3">
        </div>
      )}
    </div>
  );
};

export default MenuItems;
