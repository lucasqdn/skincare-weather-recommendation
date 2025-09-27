export default function StatGrid({ weather }) {
  if (!weather?.current) return null;
  const c = weather.current;
  const d = weather.daily;
  const stats = [
    { label: "Humidity", value: `${Math.round(c.humidity)}%` },
    { label: "Wind", value: `${Math.round(c.windSpeed)} km/h` },
    { label: "Feels like", value: `${Math.round(c.apparentTemperature)}°C` },
    { label: "UV Index", value: c.uvIndex ?? d?.uvIndexMax ?? "-" },
    { label: "High / Low", value: `${Math.round(d?.tempMax ?? c.temperature)}° / ${Math.round(d?.tempMin ?? c.temperature)}°` },
    { label: "Precip", value: `${Math.round(c.precipitation ?? 0)} mm` },
  ];
  return (
    <div className="card stat-grid">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
