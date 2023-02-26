import React, { useState } from 'react';
import SelectDeck from '../components/selectDeck';

interface DeckCardControlsProps {
  showAddButton?: boolean;
  personData?: any; // <-- update the type to any[]    
  
  onDelete?: () => void; // <-- add onDelete prop
}




const DeckCardControls: React.FC<DeckCardControlsProps> = ({ showAddButton, personData, onDelete }) => { // <-- pass onDelete to the function arguments
  const [isSelectDeckOpen, setIsSelectDeckOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<{ deckName: string; personData: [] } | ''>('');

  const handleSelectDeckClick = () => {
    setIsSelectDeckOpen(!isSelectDeckOpen);
  };

  const handleCloseSelectDeck = () => {
    setIsSelectDeckOpen(false);
  };

  const handleDeckSelect = (deckName: string) => {
    setSelectedDeck({ deckName, personData: [] });
    handleCloseSelectDeck();
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const selectDeckProps = {
    isOpen: isSelectDeckOpen,
    onClose: handleCloseSelectDeck,
    handleDeckSelect,
    personData: personData!,
  };

  return (
    <div className="">
      {showAddButton ? (
        <button className="btn bg-white hover:bg-transparent float-right " onClick={handleSelectDeckClick}>
          <span className="text-2xl text-black"> + </span>
        </button>
      ) : (
        <button className="btn btn-active p-3  ml-[17rem] absolute z-10 mt-2" onClick={handleDeleteClick}> 
          <img src="../../icons/bin.svg" alt="" width="20" height="21" />
        </button>
      )}

      {<SelectDeck {...selectDeckProps} />}
    </div>
  );
};

export default DeckCardControls;
