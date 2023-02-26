import React, { useState, useEffect } from 'react';

interface Deck {
  name: string;
  icon: string;
  bgColor: string;
  personData?: any[]; // Add a prop for personData
}

interface SelectDeckProps {
  isOpen: boolean;
  handleDeckSelect: (deckName: string, personData: any, fromDeckName?: string) => void;
  personData?: any[]; // Define a prop for personData
}

const SelectDeck: React.FC<SelectDeckProps> = ({ isOpen, handleDeckSelect, personData }) => {
  const [deckNames, setDeckNames] = useState<string[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const savedDecks = localStorage.getItem('deck');
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
      setDeckNames(JSON.parse(savedDecks).map((deck: { name: string }) => deck.name));
    }
  }, []);

  const handleClick = (deckName: string) => {
    const deckIndex = decks.findIndex((deck) => deck.name === deckName);
    if (deckIndex !== -1) {
      const updatedDecks = [...decks];
      const currentDeck = updatedDecks[deckIndex];
      const currentPersonData = currentDeck.personData || [];
      const updatedPersonData = [...currentPersonData, personData];
      const updatedDeck = { ...currentDeck, personData: updatedPersonData };
      updatedDecks[deckIndex] = updatedDeck;
      setDecks(updatedDecks);
      localStorage.setItem('deck', JSON.stringify(updatedDecks));
      const fromDeckIndex = decks.findIndex((deck) => deck.personData?.includes(personData));
      if (fromDeckIndex !== -1) {
        const fromDeckName = decks[fromDeckIndex].name;
        const fromDeck = { ...decks[fromDeckIndex], personData: decks[fromDeckIndex].personData?.filter((data) => data !== personData) };
        updatedDecks[fromDeckIndex] = fromDeck;
        setDecks(updatedDecks);
        localStorage.setItem('deck', JSON.stringify(updatedDecks));
        handleDeckSelect(deckName, updatedPersonData, fromDeckName);
      } else {
        handleDeckSelect(deckName, updatedPersonData);
      }
    }
  };
  
  
  
  return (
    <div className={`card justify-center w-[216px] h-[171px] bg-[#EDEDED] shadow-xl mt-10 relative float-right ${isOpen ? '' : 'hidden'}`}>
      <div className="card-body">
        <div className="">
          <span className="text-black">Select a deck</span>
        </div>
        <hr className='bg-[#B8B8B8]' />
        <div className="card-actions justify-end w-full ">
          {deckNames.map((deckName) => (
            <button
              key={deckName}
              className={`btn bg-white w-40 flex items-center justify-between hover:bg-transparent`}
              onClick={() => handleClick(deckName)}
            >
              <div className="">
                <span className={`text-black ml-8 absolute text-xs left-0 ${deckName.length >= 3 ? 'overflow-x-auto max-w-[80%]' : ''}`} style={{ position: 'sticky', top: 0 }}> {deckName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default SelectDeck;
