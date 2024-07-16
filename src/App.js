import React from "react";

import "./index.css";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./helpers";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={getToken() ? <Chat /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default App;
