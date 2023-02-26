import { SetStateAction, useEffect, useState } from "react";
import FactionsButton from "./FactionsButton";

interface Deck {
  id: number;
  name: string;
  icon: string;
  bgColor: string;
}

interface CreateDeckProps {
  onAddDeck: (deck: Deck) => void;
}

function CreateDeck(props: CreateDeckProps) {
  const [selectedButton, setSelectedButton] = useState(-1);
  const [deckIcon, setDeckIcon] = useState("../../icons/deckicon1.svg");
  const [bgColor, setBgColor] = useState("#C53030");
  const [deckName, setDeckName] = useState("");
  const [deckId, setDeckId] = useState(0);
  const [deck, setDeck] = useState<Deck[]>([]);

  const handleButtonClick = (index: number) => {
    if (selectedButton === index) {
      setSelectedButton(-1);
    } else {
      setSelectedButton(index);
      switch (index) {
        case 0:
          setDeckIcon("../../icons/deckicon1.svg");
          setBgColor("#C53030");
          break;
        case 1:
          setDeckIcon("../../icons/deckicon3.svg");
          setBgColor("#2F855A");
          break;
        case 2:
          setDeckIcon("../../icons/deckicon2.svg");
          setBgColor("#3B3B3B");
          break;
        case 3:
          setDeckIcon("../../icons/deckicon.svg");
          setBgColor("#969696");
          break;
        default:
          break;
      }
    }
  };

  const handleCreateDeck = (): void => {
    const newDeck: Deck = {
      id: deckId,
      name: deckName,
      icon: deckIcon,
      bgColor: bgColor,
    };
    props.onAddDeck(newDeck);
    const updatedDeck = [...deck, newDeck];
    setDeck(updatedDeck);
    setDeckName("");
    setDeckIcon("");
    setBgColor("");
    setDeckId(deckId + 1);

    // Store updated cards data in localStorage
    localStorage.setItem("deck", JSON.stringify(updatedDeck));
  };
  useEffect(() => {
    const savedDecks = localStorage.getItem("deck");
    if (savedDecks) {
      setDeck(JSON.parse(savedDecks));
      setDeckId(JSON.parse(savedDecks).length);
    }
  }, []);

  const handleDeleteCard = (index: number): void => {};

  return (
    <div className="card w-[19rem] h-40 bg-base-100 shadow-xl ml-[1200px] mt-4 z-50	absolute">
      <div className="flex justify-between">
        <span className="text-black mt-4 ml-2">Figure</span>
        <span className="mr-10 mt-10 flex gap-1 ">
          <button
            className={`btn p-3 btn-ghost btn-outline  hover:bg-transparent ${
              selectedButton === 0 ? "" : "bg-[#D4D4D4]"
            }`}
            onClick={() => handleButtonClick(0)}
          >
            <FactionsButton id={0} selectedButton={selectedButton} />
          </button>
          <button
            className={`btn p-3 btn-ghost btn-outline  hover:bg-transparent ${
              selectedButton === 1 ? "" : "bg-[#D4D4D4]"
            }`}
            onClick={() => handleButtonClick(1)}
          >
            <FactionsButton id={1} selectedButton={selectedButton} />
          </button>
          <button
            className={`btn p-3 btn-ghost btn-outline  hover:bg-transparent ${
              selectedButton === 2 ? "" : "bg-[#D4D4D4]"
            }`}
            onClick={() => handleButtonClick(2)}
          >
            <FactionsButton id={2} selectedButton={selectedButton} />
          </button>
          <button
            className={`btn p-3 btn-ghost btn-outline  hover:bg-transparent ${
              selectedButton === 3 ? "" : "bg-[#D4D4D4]"
            }`}
            onClick={() => handleButtonClick(3)}
          >
            <FactionsButton id={3} selectedButton={selectedButton} />
          </button>
        </span>
      </div>
      <div className="card-body relative flex flex-col justify-between">
        <div
          className="card-actions justify-end"
          style={{ marginTop: "-1.5rem" }}
        >
          <p className="text-xs mr-20 mt-2">Deck Name</p>
          <input
            type="text"
            placeholder="Enter Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="border-b border-gray-500 focus:outline-none focus:border-black w-full mt-0 text-black"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCreateDeck();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
