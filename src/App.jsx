import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecommendationCard from "./components/RecommendationCard";
import HourlyStrip from "./components/HourlyStrip";
import StatGrid from "./components/StatGrid";
import { getWeather, getConditionCategory } from "./services/weatherService";
import { recommendSkincare } from "./ml/skinModel";

function App() {
  const [place, setPlace] = useState(null);
  const [placeLabel, setPlaceLabel] = useState("");
  const [weather, setWeather] = useState(null);
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!place) return;
    let active = true;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const w = await getWeather(place.latitude, place.longitude);
        if (!active) return;
        setWeather(w);
        setRecs(
          recommendSkincare({
            temperature: w.current.temperature,
            humidity: w.current.humidity,
            uvIndex: w.current.uvIndex ?? w.daily?.uvIndexMax,
            windSpeed: w.current.windSpeed,
            precipitation: w.current.precipitation,
            condition: w.current.condition,
          })
        );
      } catch (e) {
        if (active) setError("Failed to load weather");
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [place]);

  const themeClass = weather ? `app theme-${getConditionCategory(weather.current.weatherCode)}` : "app";
  return (
    <div className={themeClass}>
      <Header />
      <SearchBar
        onSelect={(p) => {
          setPlace(p);
          setPlaceLabel(`${p.name}${p.admin1 ? ", " + p.admin1 : ""}${p.country ? ", " + p.country : ""}`);
        }}
      />
      {loading && <div className="status">Loading weather…</div>}
      {error && <div className="error">{error}</div>}
      {!place && <div className="hint">Search for a city to begin</div>}
      <div className="layout">
        <div>
          <WeatherCard placeLabel={placeLabel} weather={weather} />
          <div style={{ marginTop: 16 }}>
            <HourlyStrip weather={weather} />
          </div>
        </div>
        <div>
          <StatGrid weather={weather} />
          <div style={{ marginTop: 16 }}>
            <RecommendationCard data={recs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
