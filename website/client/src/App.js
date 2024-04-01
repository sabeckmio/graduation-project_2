import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import FindPasswordPage from "./components/views/FindPasswordPage/FindPasswordPage";
import HomePage from "./components/views/HomePage/HomePage";
import Header from "./components/views/Header/Header";
import Aside from "./components/views/Aside/Aside";

function App() {
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route exact path="/" element={LoginPage()} />
        <Route exact path="/main" element={HomePage()} />
        <Route exact path="/register" element={RegisterPage()} />
        <Route exact path="/findpassword" element={FindPasswordPage()} />
      </Routes>
    </div>
  );
}

export default App;
