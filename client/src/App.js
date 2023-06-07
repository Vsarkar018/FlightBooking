import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import ProtectRoute from "./components/ProtectRoute";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact path="/booking"
          element={
            <ProtectRoute>
              <Booking />
            </ProtectRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
