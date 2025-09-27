import { getWeatherIcon, getConditionCategory } from "../services/weatherService";

export default function WeatherCard({ placeLabel, weather }) {
	if (!weather) return null;
	const c = weather.current;
	const d = weather.daily;
	const icon = getWeatherIcon(c.weatherCode, isNight(c.time));
	const theme = `hero hero-${getConditionCategory(c.weatherCode)}`;
	return (
		<div className={theme}>
			<div className="hero-top">
				<div className="hero-location">{placeLabel || "Current location"}</div>
				<div className="hero-condition">
					<span className="hero-icon" aria-hidden>{icon}</span>
					<span>{c.condition}</span>
				</div>
			</div>

			<div className="hero-temp">
				{Math.round(c.temperature)}<span className="deg">°</span>
			</div>
			<div className="hero-feels">Feels like {Math.round(c.apparentTemperature)}°</div>
			<div className="hero-range">
				H: {Math.round(d?.tempMax ?? c.temperature)}° L: {Math.round(d?.tempMin ?? c.temperature)}°
			</div>
		</div>
	);
}

function isNight(ts) {
	try {
		const d = new Date(ts);
		const h = d.getHours();
		return h < 6 || h >= 20;
	} catch (e) {
		return false;
	}
}

