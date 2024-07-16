import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getToken } from "./helpers";
import SignIn from "./pages/SignIn/SignIn";

import Chat from "./components/Chat";
import SignUp from "./pages/SignUp/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route
        path="/"
        element={getToken() ? <Chat /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default AppRoutes;
