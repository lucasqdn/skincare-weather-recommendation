import React from "react";

export default function SkincareAdvice({ temp, humidity, uv }) {
  const tips = [];

  // Temperature rules
  if (temp > 30) {
    tips.push("☀️ Hot weather: Use lightweight sunscreen SPF 50+, gel moisturizer, and gentle cleanser.");
  } else if (temp < 10) {
    tips.push("❄️ Cold weather: Apply heavy cream moisturizer, lip balm, and hydrating toner.");
  } else {
    tips.push("🌤️ Mild weather: Daily SPF 30+ and a regular moisturizer are enough.");
  }

  // Humidity rules
  if (humidity < 40) {
    tips.push("💧 Low humidity: Use hyaluronic acid serum, ceramide moisturizer, and an occlusive balm.");
  } else if (humidity > 70) {
    tips.push("🌫️ High humidity: Use lightweight, oil-free gel moisturizers to avoid clogged pores.");
  } else {
    tips.push("👌 Balanced humidity: Normal moisturizer is fine.");
  }

  // UV index rules
  if (uv <= 2) {
    tips.push("🧴 UV low: SPF 15–30 is fine.");
  } else if (uv <= 5) {
    tips.push("🧴 UV moderate: SPF 30+, reapply every 2–3 hours.");
  } else if (uv <= 7) {
    tips.push("🧴 UV high: SPF 50+, sunglasses and hat recommended.");
  } else {
    tips.push("🧴 UV very high: SPF 50+, physical sunblock (zinc/titanium), avoid midday sun.");
  }

  return (
    <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>💡 Skincare Recommendations</h3>
      <ul>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
