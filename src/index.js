import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from "./Components/LogIn";
import HomePage from "./Components/HomePage";
/*<React.StrictMode>
    <App />
  </React.StrictMode>*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="HomePage" element={<HomePage />} />
      <Route path="Login" element={<LogIn />} />
    </Routes>
  </BrowserRouter>
);

