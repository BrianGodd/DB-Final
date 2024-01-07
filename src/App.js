import React from 'react';
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import GuessPage from "./pages/GuessPage";
import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/DB-Final/" element = {<MainPage />} />
        <Route path = "/DB-Final/Search" element = {<SearchPage />} />
        <Route path = "/DB-Final/Guess" element = {<GuessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
