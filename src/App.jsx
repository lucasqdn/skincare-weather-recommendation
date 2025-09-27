import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import WeatherPage from "./pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={`app ${isHome ? "home" : ""}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </div>
  );
}

export default App;
