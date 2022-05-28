import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import LogIn from "./Components/Welcome/LogInScreen";
import HomePage from "./Components/HomePage/HomePage";
import Welcome from "./Components/Welcome/Welcome";
import SignupScreen from "./Components/Welcome/SingupScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="HomePage" element={<HomePage />} />
      <Route path="Login" element={<LogIn />} />
      <Route path="Signup" element={<SignupScreen />} />
    </Routes>
  );
}

export default App;
