// Weather service using Open-Meteo APIs (no API key required)
// Docs: https://open-meteo.com/

const GEOCODE_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE = "https://api.open-meteo.com/v1/forecast";

/**
 * Search a location name and return candidates
 * @param {string} name city or place name
 * @param {number} count max results
 */
export async function geocodeCity(name, count = 5) {
	if (!name || !name.trim()) return [];
	const url = new URL(GEOCODE_BASE);
	url.searchParams.set("name", name.trim());
	url.searchParams.set("count", String(count));
	url.searchParams.set("language", "en");
	url.searchParams.set("format", "json");

	const res = await fetch(url.toString());
	if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
	const data = await res.json();
	const results = data?.results ?? [];
	return results.map((r) => ({
		id: `${r.latitude},${r.longitude}`,
		name: r.name,
		country: r.country,
		admin1: r.admin1,
		latitude: r.latitude,
		longitude: r.longitude,
		timezone: r.timezone,
	}));
}

/**
 * Fetch current and near-term weather for coords
 * @param {number} latitude
 * @param {number} longitude
 */
export async function getWeather(latitude, longitude) {
	const url = new URL(WEATHER_BASE);
	url.searchParams.set("latitude", String(latitude));
	url.searchParams.set("longitude", String(longitude));
	url.searchParams.set(
		"current",
		[
			"temperature_2m",
			"apparent_temperature",
			"relative_humidity_2m",
			"wind_speed_10m",
			"precipitation",
			"rain",
			"weather_code",
			"uv_index",
		].join(",")
	);
		url.searchParams.set(
			"hourly",
			[
				"temperature_2m",
				"precipitation_probability",
				"weather_code",
				"uv_index",
			].join(",")
		);
		url.searchParams.set(
			"daily",
			["uv_index_max", "temperature_2m_max", "temperature_2m_min"].join(",")
		);
	url.searchParams.set("forecast_days", "1");
	url.searchParams.set("timezone", "auto");

	const res = await fetch(url.toString());
	if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
	const data = await res.json();

	const current = data.current ?? {};
	const hourly = data.hourly ?? {};
	const daily = data.daily ?? {};

		const normalized = {
		current: {
			temperature: current.temperature_2m,
			apparentTemperature: current.apparent_temperature,
			humidity: current.relative_humidity_2m,
			windSpeed: current.wind_speed_10m,
			precipitation: current.precipitation,
			rain: current.rain,
			uvIndex: current.uv_index,
			weatherCode: current.weather_code,
				condition: getConditionLabel(current.weather_code),
			time: current.time,
		},
			hourly: {
				time: hourly.time,
				uvIndex: hourly.uv_index,
				temperature: hourly.temperature_2m,
				precipProb: hourly.precipitation_probability,
				weatherCode: hourly.weather_code,
			},
		daily: {
			time: daily.time?.[0],
			uvIndexMax: daily.uv_index_max?.[0],
				tempMax: daily.temperature_2m_max?.[0],
				tempMin: daily.temperature_2m_min?.[0],
		},
		timezone: data.timezone,
		raw: data,
	};

	// Fallback: if current uv is missing, try to derive from hourly closest time
	if (
		(normalized.current.uvIndex === undefined || normalized.current.uvIndex === null) &&
		Array.isArray(normalized.hourly.time) &&
		Array.isArray(normalized.hourly.uvIndex)
	) {
		const idx = normalized.hourly.time.indexOf(current.time);
		if (idx >= 0) normalized.current.uvIndex = normalized.hourly.uvIndex[idx];
	}

	return normalized;
}

function getConditionLabel(code) {
	// WMO Weather interpretation codes (WW)
	const map = {
		0: "Clear sky",
		1: "Mainly clear",
		2: "Partly cloudy",
		3: "Overcast",
		45: "Fog",
		48: "Depositing rime fog",
		51: "Light drizzle",
		53: "Moderate drizzle",
		55: "Dense drizzle",
		56: "Light freezing drizzle",
		57: "Dense freezing drizzle",
		61: "Slight rain",
		63: "Moderate rain",
		65: "Heavy rain",
		66: "Light freezing rain",
		67: "Heavy freezing rain",
		71: "Slight snow fall",
		73: "Moderate snow fall",
		75: "Heavy snow fall",
		77: "Snow grains",
		80: "Slight rain showers",
		81: "Moderate rain showers",
		82: "Violent rain showers",
		85: "Slight snow showers",
		86: "Heavy snow showers",
		95: "Thunderstorm",
		96: "Thunderstorm with slight hail",
		99: "Thunderstorm with heavy hail",
	};
	return map[code] ?? "Unknown";
}

	export function getConditionCategory(code) {
		// broad categories for UI theming
		if (code === 0) return "clear";
		if ([1, 2, 3].includes(code)) return "clouds";
		if ([45, 48].includes(code)) return "fog";
		if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
		if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
		if ([95, 96, 99].includes(code)) return "thunder";
		return "other";
	}

	export function getWeatherIcon(code, isNight = false) {
		const cat = getConditionCategory(code);
		switch (cat) {
			case "clear":
				return isNight ? "🌙" : "☀️";
			case "clouds":
				return isNight ? "☁️" : "⛅️";
			case "fog":
				return "🌫️";
			case "rain":
				return "🌧️";
			case "snow":
				return "❄️";
			case "thunder":
				return "⛈️";
			default:
				return "🌤️";
		}
	}

export default {
	geocodeCity,
	getWeather,
};

