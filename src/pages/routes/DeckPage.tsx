import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DeckInnerCardControls from "../../components/DeckInnerCardControls";
type Deck = {
  id: number;
  name: string;
  personData: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    birth_year: string;
    gender: string;
    speciesName: string;
    homeworldName: string;
    homeworld: string;
    vehicles: string[];
    starships: string[];
  }[];
};


function DeckPage() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setDeckId(id!);
  }, [id]);

  useEffect(() => {
    const storedDecks = JSON.parse(
      localStorage.getItem("deck") || "[]"
    ) as Deck[];
    if (storedDecks) {
      const matchingDeck = storedDecks.find(
        (deck) => deck.id === Number(deckId)
      );
      if (matchingDeck) {
        setDeck(matchingDeck);
      }
    }
  }, [deckId]);

  const handleDeletePerson = (personName: string) => {
    if (deck) {
      const updatedPersonData = Array.isArray(deck.personData) ? deck.personData.filter(
        (person: { name: string; }) => person.name !== personName
      ) : [];
      const updatedDeck = { ...deck, personData: updatedPersonData };
      const updatedDecks = JSON.parse(
        localStorage.getItem("deck") || "[]"
      ).map((storedDeck: Deck) =>
        storedDeck.id === Number(deckId) ? updatedDeck : storedDeck
      );
      localStorage.setItem("deck", JSON.stringify(updatedDecks));
      setDeck(updatedDeck);
    }
  };
  

  return (
    <div className="flex  flex-wrap gap-4">
      {deck && deck.personData && Array.isArray(deck.personData) && deck.personData.map((person) => (
        <div className="card  justify-center w-72 h-96 bg-white shadow-xl mt-10  ">
          <div className="bg-[#969696] p-6 rounded-t-lg">
 <DeckInnerCardControls
 personData={person} fromDeckName={deck.name}
                onDelete={() => handleDeletePerson(person.name)}
                
              />
            <div className="absolute left-0 right-0 top-0 z-50 mr-3 mt-4"></div>

            <img src="../../icons/allcard.svg" className="w-6 h-6" />
            <div className=""></div>
            <h2 className="card-title mt-4 text-white">
              {person.name}
            </h2>
          </div>
          <div className="card-body">
            <div className="flex justify-between">
              <span className="text-black">{person.gender}</span>
              <span className="text-black">{person.speciesName}</span>
            </div>
            <hr />
            <div className="card-actions justify-end w-full">
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/homeworld.svg" className="w-6 h-6" />
                <span className="text-black ml-8 absolute text-xs">
                  Homeworld
                </span>
                <span className="text-black text-sm">
                  {person.homeworldName}
                </span>
              </button>
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/vehicle.svg" className="w-6 h-6" />
                <span className="text-black bg-[#EDEDED] ml-8 absolute text-xs">
                  Vehicles
                </span>
                <span className="text-black">
                  {person.vehicles.length}
                </span>
              </button>
              <button className="btn bg-[#EDEDED] w-60 flex items-center justify-between  hover:bg-transparent">
                <img src="../../icons/starship.svg" className="w-6 h-6" />
                <span className="text-black ml-8 absolute text-xs">
                  Starships
                </span>
                <span className="text-black ">
                  {person.starships.length}
                </span>
              </button>
            </div>
          </div>
        </div>
            ))}
            </div>
  );
}

export default DeckPage;
