export default function StatGrid({ weather }) {
  if (!weather?.current) return null;
  const c = weather.current;
  const d = weather.daily;
  const h = weather.hourly ?? {};

  // Determine precip chance at current time (fallback to first hour)
  let precipChance = null;
  if (Array.isArray(h.time) && Array.isArray(h.precipProb)) {
    const idx = h.time?.indexOf(c.time);
    const i = idx >= 0 ? idx : 0;
    precipChance = h.precipProb?.[i];
  }

  const stats = [
    { label: "Humidity", value: `${Math.round(c.humidity)}%`, icon: "💧" },
    { label: "Wind", value: `${Math.round(c.windSpeed)} km/h`, icon: "🌬️" },
    { label: "Feels like", value: `${Math.round(c.apparentTemperature)}°C`, icon: "🌡️" },
    { label: "UV Index", value: c.uvIndex ?? d?.uvIndexMax ?? "-", icon: "☀️" },
    { label: "Precipitation", value: `${Math.round(c.precipitation ?? 0)} mm`, icon: "🌧️" },
  ];
  if (precipChance != null) {
    stats.push({ label: "Precip chance", value: `${Math.round(precipChance)}%`, icon: "☔️" });
  }
  stats.push({
    label: "High / Low",
    value: `${Math.round(d?.tempMax ?? c.temperature)}° / ${Math.round(d?.tempMin ?? c.temperature)}°`,
    icon: "↕️",
  });

  return (
    <div className="card stat-grid">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="stat-icon" aria-hidden>{s.icon}</div>
          <div className="stat-meta">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
