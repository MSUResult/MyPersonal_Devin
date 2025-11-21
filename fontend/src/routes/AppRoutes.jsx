import React from "react";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Home from "../screens/Home";
import Signup from "../screens/Register";
import Login from "../screens/Login";
import Project from '../screens/projec'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
