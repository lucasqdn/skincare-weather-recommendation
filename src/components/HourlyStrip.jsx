import { getWeatherIcon } from "../services/weatherService";

export default function HourlyStrip({ weather, hours = 12 }) {
  if (!weather?.hourly?.time) return null;
  const { time, temperature, uvIndex, precipProb, weatherCode } = weather.hourly;
  const items = time.slice(0, hours).map((t, i) => ({
    time: t,
    temp: temperature?.[i],
    uv: uvIndex?.[i],
    pop: precipProb?.[i],
    code: weatherCode?.[i],
  }));
  return (
    <div className="card hourly">
      <div className="hourly-title">Hourly forecast</div>
      <div className="hourly-scroll">
        {items.map((it, idx) => (
          <div key={idx} className="hourly-item">
            <div className="hourly-time">{formatHour(it.time)}</div>
            <div className="hourly-icon">{getWeatherIcon(it.code)}</div>
            <div className="hourly-temp">{Math.round(it.temp)}°</div>
            <div className="hourly-uv">UV {it.uv ?? "-"}</div>
            {it.pop != null && <div className="hourly-pop">{it.pop}%</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatHour(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "numeric" });
  } catch (e) {
    return "-";
  }
}
