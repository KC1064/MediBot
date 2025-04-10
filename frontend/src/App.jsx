import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnboardingForm from "./pages/Onboarding";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="onboarding" element={<OnboardingForm />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
