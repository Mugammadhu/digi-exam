import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
      </Routes>
    </Router>
  );
};

export default App;
