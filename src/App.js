import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/SignIn/Login";
import Register from "./components/SignUp/Register";
import Appcontent from "./AppContent/Appcontent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appcontent" element={<Appcontent />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
