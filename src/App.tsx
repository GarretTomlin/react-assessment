import { useState } from "react";
import Deck from "./components/Deck";
import Menu from "./components/Menu";
import Card from "./components/Card";
import DeckPage from "./pages/routes/DeckPage";
import Login from "./pages/auth/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";

function App() {
  const [selectedItem, setSelectedItem] = useState("All Cards");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuItemClick = (label:string) => {
    setSelectedItem(label);
  };

  const handleLoginSuccess = (credentialResponse:CredentialResponse) => {
    if (credentialResponse) {
      setIsLoggedIn(true);
    }
  };
  

  return (
    <div className="mt-20 ml-48 mr-48 ">
      {!isLoggedIn && <Login handleLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
