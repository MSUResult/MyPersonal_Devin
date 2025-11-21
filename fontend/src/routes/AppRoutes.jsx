import React from "react";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Home from "../screens/Home";
import Signup from "../screens/Register";
import Login from "../screens/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
