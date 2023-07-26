import React from "react";
import { Routes, Route } from "react-router-dom";

import CharactersPage from "./pages/characters-page";
import CharacterDetailsPage from "./pages/character-details-page";
import NoMatch from "./pages/not-found-page";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/details/:name" element={<CharacterDetailsPage />} />

        {/* 
          Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. 
        */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
