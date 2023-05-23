import React, { useEffect } from "react";
import Clips from "./components/Clips/Clips";
import AOS from "aos";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ClipUpload from "./components/ClipUpload/ClipUpload";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProfileSetup from "./components/ProfileSetup/ProfileSetup";
import UserPage from "./components/UserPage/UserPage";

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
          path="/profileSetup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clips"
          element={
            <ProtectedRoute>
              <Clips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clips/upload"
          element={
            <ProtectedRoute>
              <ClipUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
