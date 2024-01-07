import React from 'react';
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import GuessPage from "./pages/GuessPage";
import RankPage from "./pages/RankPage";
import PlayListPage from "./pages/PlayListPage";
import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/DB-Final/" element = {<MainPage />} />
        <Route path = "/DB-Final/Search" element = {<SearchPage />} />
        <Route path = "/DB-Final/Guess" element = {<GuessPage />} />
        <Route path = "/DB-Final/Ranking" element = {<RankPage />} />
        <Route path = "/DB-Final/PlayListPage" element = {<PlayListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
