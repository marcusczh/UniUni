import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Components/Welcome/LogInScreen";
import HomePage from "./Components/HomePage/HomePage";
import Welcome from "./Components/Welcome/Welcome";
import SignupScreen from "./Components/Welcome/SingupScreen";

/*<React.StrictMode>
    <App />
  </React.StrictMode>*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="HomePage" element={<HomePage />} />
      <Route path="Login" element={<LogIn />} />
      <Route path="Signup" element={<SignupScreen />} />
    </Routes>
  </BrowserRouter>
);
