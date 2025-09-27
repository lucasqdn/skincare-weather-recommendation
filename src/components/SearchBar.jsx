import { useEffect, useMemo, useState } from "react";
import { geocodeCity } from "../services/weatherService";

export default function SearchBar({ onSelect }) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// debounce query
	const debounced = useDebounce(query, 300);

	useEffect(() => {
		let active = true;
		async function run() {
			setError("");
			if (!debounced) {
				setResults([]);
				return;
			}
			setLoading(true);
			try {
				const list = await geocodeCity(debounced, 5);
				if (active) setResults(list);
			} catch (e) {
				if (active) setError("Could not search places");
			} finally {
				if (active) setLoading(false);
			}
		}
		run();
		return () => {
			active = false;
		};
	}, [debounced]);

	return (
		<div className="searchbar">
			<input
				className="search-input"
				placeholder="Search city (e.g. London)"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{loading && <div className="search-status">Searching…</div>}
			{error && <div className="search-error">{error}</div>}
			{!!results.length && (
				<ul className="search-results">
					{results.map((r) => (
						<li
							key={r.id}
							className="search-result"
							onClick={() => {
								onSelect?.(r);
								setQuery(`${r.name}${r.admin1 ? ", " + r.admin1 : ""}, ${r.country}`);
								setResults([]);
							}}
						>
							<span>
								{r.name}
								{r.admin1 ? `, ${r.admin1}` : ""} {r.country ? `• ${r.country}` : ""}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function useDebounce(value, delay) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setV(value), delay);
		return () => clearTimeout(t);
	}, [value, delay]);
	return v;
}

