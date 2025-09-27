import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import WeatherPage from "./pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
