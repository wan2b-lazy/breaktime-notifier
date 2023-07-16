import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Ongoing from "./components/Ongoing";
import Notify from "./components/Notify";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ongoing" element={<Ongoing />} />
        <Route path="/notify" element={<Notify />} />
      </Routes>
    </Router>
  );
};

export default App;

