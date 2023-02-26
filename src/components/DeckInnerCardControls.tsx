import React, { useState } from 'react';
import SelectDeck from './selectDeck';

interface DeckInnerCardControlsProps {
  onDelete: () => void;
  personData?: any;
  fromDeckName?: string;
}

function DeckInnerCardControls({ onDelete, personData, fromDeckName}: DeckInnerCardControlsProps) {
  const [isSelectDeckOpen, setIsSelectDeckOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<{ deckName: string; personData: any[]; fromDeckName: string } | ''>('');


  const handleMoveButtonClick = () => {
    setIsSelectDeckOpen(true);
  };

  const handleDeckSelect = (deckName: string) => {
    setSelectedDeck({ deckName, personData: [], fromDeckName: fromDeckName || '' });
    setIsSelectDeckOpen(false);
  };
  

  const selectDeckProps = {
    isOpen: isSelectDeckOpen,
    handleDeckSelect,
    personData: personData!,
    fromDeckName: fromDeckName!,
  };

  return (
    <div className="flex gap-2 absolute ml-40 top-0 mt-2">
      <button className="btn btn-active p-3 bg-[#fff] hover:bg-transparent" onClick={handleMoveButtonClick}>
        <img src="../../icons/move.svg" alt="" width="20" height="21" />
      </button>

      <button className="btn btn-active p-3 bg-[#fff] hover:bg-transparent " onClick={onDelete}>
        <img src="../../icons/bin.svg" alt="" width="20" height="21" />
      </button>

      <SelectDeck {...selectDeckProps} />
    </div>
  );
}

export default DeckInnerCardControls;
