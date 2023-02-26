import { useState } from "react";
import Deck from "./components/Deck";
import Menu from "./components/Menu";
import Card from "./components/Card";
import DeckPage from "./pages/routes/DeckPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [selectedItem, setSelectedItem] = useState("All Cards");

  const handleMenuItemClick = (label:string) => {
    setSelectedItem(label);
  };

  return (
    <div className="mt-20 ml-48 mr-48 ">
      <Menu onItemClick={handleMenuItemClick} selectedItem={selectedItem} />
      <hr className="mt-4 bg-[#B8B8B8] h-0.5" />

      {selectedItem === "All Cards" ? (
        <Card  />
        ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Deck />} />
            <Route path="/deck/:id" element={<DeckPage />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
