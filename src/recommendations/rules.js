// Skincare rules: warnings and suggestions based on current weather

/**
 * @typedef {Object} CurrentWeather
 * @property {number} temperature
 * @property {number} humidity
 * @property {number=} uvIndex
 * @property {number=} windSpeed
 * @property {number=} precipitation
 * @property {string=} condition
 */

/**
 * @param {CurrentWeather} current
 * @returns {{ warnings: string[], suggestions: Array<{title: string, details: string}> }}
 */
export function recommendSkincare(current) {
  if (!current) return { warnings: [], suggestions: [] };
  const warnings = [];
  const suggestions = [];

  const temp = Number(current.temperature);
  const humid = Number(current.humidity);
  const uv = current.uvIndex ?? 0;
  const wind = Number(current.windSpeed ?? 0);
  const precip = Number(current.precipitation ?? 0);
  const cond = current.condition ?? "";

  if (uv >= 3 && uv < 6) warnings.push("Moderate UV: Wear SPF 30+, reapply every 2 hours.");
  else if (uv >= 6 && uv < 8) warnings.push("High UV: SPF 50+, wear hat/sunglasses.");
  else if (uv >= 8) warnings.push("Very High UV: Limit sun, SPF 50+, reapply often.");
  else suggestions.push({ title: "Daily sunscreen", details: "Even at low UV, use a broad-spectrum SPF 30 as a habit." });

  if (temp <= 5) {
    warnings.push("Cold/dry risk: Skin barrier can be compromised.");
    suggestions.push({ title: "Rich moisturizer", details:"Creams with ceramides, panthenol, or niacinamide helps protect the skin barrier and retain moisture." });
  } else if (temp >= 28) {
    suggestions.push({ title: "Lightweight gel moisturizer", details: "Use lightweight, non-comedenic gels, especially in hot weather." });
  }

  if (humid < 30) {
    warnings.push("Low humidity: Skin loses water more quickly.");
    suggestions.push({ title: "Humectants", details: "Look for hyaluronic acid/glycerin." });
  } else if (humid > 70) {
    suggestions.push({ title: "Mattifying SPF", details: "Use oil-controlling sunscreens to reduce shine." });
  }

  if (precip > 0 || /rain|shower|drizzle/i.test(cond)) {
    suggestions.push({ title: "Water-resistant SPF", details: "Choose water-resistant sunscreen if spending time outside." });
  }

  return { warnings, suggestions };
}

export default { recommendSkincare };
