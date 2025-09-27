import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import HourlyStrip from "../components/HourlyStrip";
import StatGrid from "../components/StatGrid";
import RecommendationCard from "../components/RecommendationCard";
import ProductRecommendations from "../components/ProductRecommendations";
import { getWeather, getConditionCategory } from "../services/weatherService";
import { recommendSkincare, recommendProducts } from "../ml/skinModel";

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

  const themeClass = weather ? `app theme-${getConditionCategory(weather.current.weatherCode)}` : "app";

  return (
    <div className={themeClass}>
      {loading && <div className="status">Loading weather…</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
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
            <div style={{ marginTop: 16 }}>
              <ProductRecommendations products={products} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
