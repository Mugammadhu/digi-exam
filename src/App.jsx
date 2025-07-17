import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "./App.css";
import CreateAssessment from "./components/CreateAssessment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<CreateAssessment/>} />
      </Routes>
    </Router>
  );
};

export default App;
