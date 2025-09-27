import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import HourlyStrip from "../components/HourlyStrip";
import StatGrid from "../components/StatGrid";
import RecommendationCard from "../components/RecommendationCard";
import ProductRecommendations from "../components/ProductRecommendations";
import { getWeather, getConditionCategory } from "../services/weatherService";
import { recommendSkincare, recommendProducts } from "../recommendations";
import WeatherBackground from "../components/WeatherBackground";

export default function WeatherPage() {
  const [params] = useSearchParams();
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  const name = params.get("name") || "";
  const admin = params.get("admin") || "";
  const country = params.get("country") || "";
  const placeLabel = [name, admin, country].filter(Boolean).join(", ");

  const [weather, setWeather] = useState(null);
  const [recs, setRecs] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function run() {
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      setLoading(true);
      setError("");
      try {
        const w = await getWeather(lat, lon);
        if (!active) return;
        setWeather(w);
        const current = {
          temperature: w.current.temperature,
          humidity: w.current.humidity,
          uvIndex: w.current.uvIndex ?? w.daily?.uvIndexMax,
          windSpeed: w.current.windSpeed,
          precipitation: w.current.precipitation,
          condition: w.current.condition,
        };
        setRecs(recommendSkincare(current));
        setProducts(recommendProducts(current));
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
  }, [lat, lon]);

  const category = weather ? getConditionCategory(weather.current.weatherCode) : null;
  const themeClass = weather ? `app theme-${category}` : "app";

  // Apply full-page background theme by toggling body class
  useEffect(() => {
    if (!weather) return;
    const className = `bg-${category}`;
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [weather?.current?.weatherCode, category]);

  return (
    <div className={themeClass}>
      {category && <WeatherBackground category={category} />}
      {loading && <div className="status">Loading weather…</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div className="weather-columns">
          <div className="col-left">
            <WeatherCard placeLabel={placeLabel} weather={weather} />
            <div style={{ marginTop: 16 }}>
              <HourlyStrip weather={weather} />
            </div>
            <div style={{ marginTop: 16 }}>
              <StatGrid weather={weather} />
            </div>
          </div>
          <div className="col-right">
            <RecommendationCard data={recs} />
            <div style={{ marginTop: 16 }}>
              <ProductRecommendations products={products} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
