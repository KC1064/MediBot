import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnboardingPage from "./pages/Onboarding";

import Background from "./components/Background";

const App = () => {
  return (
    <div>
      <div className="fixed h-screen w-screen -z-10">
        <Background />
      </div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
