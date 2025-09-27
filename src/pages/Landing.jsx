import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { saveQuestionnaire } from "../services/storageService";

export default function Landing() {
  const nav = useNavigate();
  const [qs, setQs] = useState({
    skinType: "",
    sensitivity: "",
    goals: "",
  });
  const [qsSaved, setQsSaved] = useState(false);

  function handleSaveQs() {
    saveQuestionnaire(qs);
    setQsSaved(true);
  }

  return (
    <div className="landing">
      <div className="landing-inner">
        <h1 className="landing-title">Your Weather, Your Skin</h1>
        <p className="landing-sub">Answer a quick set of questions to tailor tips.</p>

        <div className="landing-card">
          <div className="qs-grid">
            <div className="qs-field">
              <label>Skin type</label>
              <select
                value={qs.skinType}
                onChange={(e) => setQs({ ...qs, skinType: e.target.value })}
              >
                <option value="">Select…</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="combination">Combination</option>
                <option value="normal">Normal</option>
              </select>
            </div>
            <div className="qs-field">
              <label>Sensitivity</label>
              <select
                value={qs.sensitivity}
                onChange={(e) => setQs({ ...qs, sensitivity: e.target.value })}
              >
                <option value="">Select…</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="qs-field">
              <label>Primary goal</label>
              <select
                value={qs.goals}
                onChange={(e) => setQs({ ...qs, goals: e.target.value })}
              >
                <option value="">Select…</option>
                <option value="hydration">Hydration</option>
                <option value="oil-control">Oil control</option>
                <option value="brightening">Brightening</option>
                <option value="anti-aging">Anti-aging</option>
              </select>
            </div>
          </div>
          <button className="qs-save" onClick={handleSaveQs} disabled={qsSaved}>
            {qsSaved ? "Saved" : "Save preferences"}
          </button>
        </div>

        <div className="landing-sub">Then choose a city:</div>
        <div className="landing-search">
          <SearchBar
            onSelect={(p) => {
              nav(`/weather?lat=${p.latitude}&lon=${p.longitude}&name=${encodeURIComponent(p.name)}&admin=${encodeURIComponent(p.admin1 ?? "")}&country=${encodeURIComponent(p.country ?? "")}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
