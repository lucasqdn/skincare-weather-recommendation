export default function RecommendationCard({ data }) {
	if (!data) return null;
	const { warnings = [], suggestions = [] } = data;
	return (
		<div className="card rec-card">
			<h2>Skincare Recommendations</h2>
			{!!warnings.length && (
				<div className="warnings">
					<h3>Warnings</h3>
					<ul>
						{warnings.map((w, i) => (
							<li key={i} className="warning-item">{w}</li>
						))}
					</ul>
				</div>
			)}
			{!!suggestions.length && (
				<div className="suggestions">
					<ul>
						{suggestions.map((s, i) => (
							<li key={i} className="suggestion-item">
								<div className="suggestion-title">{s.title}</div>
								<div className="suggestion-details">{s.details}</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

