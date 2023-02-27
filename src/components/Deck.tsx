import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import CreateDeck from "./CreateDeck";
import DeckCardControls from "./DeckCardControls";
function Deck() {
  interface Deck {
    name: string;
    icon: string;
    bgColor: string;
    personData?: any
  }

  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);

  const handleCreateDeckToggle = () => {
    setIsCreateDeckOpen(!isCreateDeckOpen);
  };

  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const savedDecks = localStorage.getItem("deck");
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
    }
  }, []);

  const handleAddDeck = (deck: Deck) => {
    setDecks((prevDecks) => [...prevDecks, deck]);
  };
  const handleDeleteDeck = (index: number) => {
    const updatedDecks = [...decks];
    updatedDecks.splice(index, 1);
    setDecks(updatedDecks);
    localStorage.setItem('deck', JSON.stringify(updatedDecks));
  };
  
  

  return (
    <div>
      <div className="flex flex-col mt-4 relative">
        <BreadCrumb />
        <div className="relative inline-block">
          <input
            type="text"
            placeholder="Type here"
            className="input w-full max-w-xs bg-white pr-8"
          />
          <svg
            className="h-4 w-4 fill-current absolute top-1/2 transform -translate-y-1/2 ml-72"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M8.5 15a6.5 6.5 0 1 1 4.506-1.804l4.244 4.243a.5.5 0 0 1-.708.708l-4.243-4.244A6.45 6.45 0 0 1 8.5 15zm0-11a4.5 4.5 0 1 0 4.5 4.5A4.506 4.506 0 0 0 8.5 4z" />
          </svg>

          <button
            className="btn bg-[#fff]  hover:bg-[#B8B8B8] float-right"
            onClick={handleCreateDeckToggle}
          >
            <span className="text-2xl text-black"> + </span>
          </button>
        </div>
      </div>

      {isCreateDeckOpen && <CreateDeck onAddDeck={handleAddDeck} />}
      <div className="flex  flex-wrap gap-4 relative">
        {decks.map((deck, index) => (
          <div
            key={index}
            className={`card  w-[21rem] h-80 bg-white shadow-xl mt-10 `}
          >
            <DeckCardControls
              showAddButton={false}
              onDelete={() => handleDeleteDeck(index)}
            />
            <Link to={`/deck/${index}`} key={index}>
              <div
                className={`bg-[${deck.bgColor}] p-6 rounded-t-lg w-[21rem]  absolute`}
              >
                <img
                  src={deck.icon}
                  className="-mt-0 h-[166px] right-0 absolute top-0"
                />
                <img
                  src="../../icons/decks.svg"
                  className="w-6 h-6 top-0 left-0"
                />
                <h2 className="card-title mt-12 mr-96 text-white left-0">
                  {deck.name}
                </h2>
              </div>
              <div className="card-body relative">
                <div className="flex justify-between">
                  <span className="text-[#3B3B3B] text-7xl mt-40">      {deck.personData.length}</span>
                  <span className="text-black mt-40">Total Card</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
