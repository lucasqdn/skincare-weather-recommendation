// Simple rule-based skincare recommendation engine

/**
 * Generate skincare warnings and suggestions based on weather
 * @param {{
 *   temperature: number,
 *   humidity: number,
 *   uvIndex?: number,
 *   windSpeed?: number,
 *   precipitation?: number,
 *   condition?: string,
 * }} current
 * @returns {{
 *   warnings: string[],
 *   suggestions: Array<{title: string, details: string}>,
 * }}
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

	// UV logic
	if (uv >= 3 && uv < 6) {
		warnings.push("Moderate UV: Wear SPF 30+, reapply every 2 hours.");
	} else if (uv >= 6 && uv < 8) {
		warnings.push("High UV: SPF 50+, hat/sunglasses, seek shade midday.");
	} else if (uv >= 8) {
		warnings.push("Very High UV: Limit sun, SPF 50+, reapply often.");
	} else {
		suggestions.push({
			title: "Daily sunscreen",
			details: "Even at low UV, use a broad-spectrum SPF 30 as a habit.",
		});
	}

	// Temperature and humidity
	if (temp <= 5) {
		warnings.push("Cold/dry risk: Barrier can be compromised.");
		suggestions.push({
			title: "Rich moisturizer + occlusive",
			details: "Use ceramides, petrolatum or shea butter to lock moisture.",
		});
	} else if (temp >= 28) {
		suggestions.push({
			title: "Lightweight gel moisturizer",
			details: "Opt for non-comedogenic gels to avoid heaviness in heat.",
		});
	}

	if (humid < 30) {
		warnings.push("Low humidity: Transepidermal water loss increases.");
		suggestions.push({
			title: "Humectants",
			details: "Look for hyaluronic acid/glycerin; top with an emollient.",
		});
	} else if (humid > 70) {
		suggestions.push({
			title: "Mattifying SPF",
			details: "Use oil-controlling or mineral SPF to reduce shine.",
		});
	}

	// Wind and precipitation
	if (wind >= 25) {
		warnings.push("Wind exposure: Can cause irritation and dryness.");
		suggestions.push({
			title: "Barrier balm",
			details: "Apply a thin layer to cheeks/nose before going out.",
		});
	}

	if (precip > 0 || /rain|shower|drizzle/i.test(cond)) {
		suggestions.push({
			title: "Water-resistant SPF",
			details: "Choose water-resistant sunscreen if spending time outside.",
		});
	}

	// Default healthy routine
	suggestions.push({
		title: "Gentle cleanser",
		details: "Avoid over-cleansing; maintain skin barrier.",
	});

	return { warnings, suggestions };
}

export default { recommendSkincare };

