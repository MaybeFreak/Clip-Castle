import React, { useEffect } from "react";
import Clips from "./components/Clips/Clips";
import AOS from "aos";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ClipUpload from "./components/ClipUpload/ClipUpload";
import Header from "./components/Header/Header";

function App() {
  // Initialise the ANIMATE ON SCROLL library
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          index
          element={
            <Header>
              <Home />
            </Header>
          }
        />
        <Route
          path="/clips"
          element={
            <Header>
              <Clips />
            </Header>
          }
        />
        <Route
          path="/clips/upload"
          element={
            <Header>
              <ClipUpload />
            </Header>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
