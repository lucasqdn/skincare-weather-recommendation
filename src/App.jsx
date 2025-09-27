import React, { useState } from "react";
import weatherCard from "./components/WeatherCard";
import SkincareAdvice from "./components/SkincareAdvice";

const API_KEY = "fbf02ad5eb115c952d004cb0001c9a1a";

export default function App() {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState("");

	const fetchWEather = async (e) => {
		e.preventDefault();
		setError("");
		setWeather(null);
	}

	try {
		const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.2608724&lon=-123.113952&appid=fbf02ad5eb115c952d004cb0001c9a1a
'
	}
}