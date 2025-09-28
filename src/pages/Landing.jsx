import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { saveQuestionnaire, saveSkinProfile, getSkinProfile } from "../services/storageService";
import { analyzeSkin } from "../ml/analyzeSkin";

export default function Landing() {
  const nav = useNavigate();
  const [qs, setQs] = useState({
    skinType: "",
  });
  const [qsSaved, setQsSaved] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [scores, setScores] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Load any existing profile
  useState(() => {
    const existing = getSkinProfile();
    if (existing) setScores(existing);
  });

  function handleSaveQs() {
    saveQuestionnaire(qs);
    setQsSaved(true);
  }

  async function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setProfileSaved(false);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    setAnalyzing(true);
    try {
      const res = await analyzeSkin(f);
      setScores(res);
    } catch (err) {
      console.error("analyzeSkin failed", err);
    } finally {
      setAnalyzing(false);
    }
  }

  function handleSaveProfile() {
    if (!scores) return;
    saveSkinProfile(scores);
    setProfileSaved(true);
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
          </div>
          <button className="qs-save" onClick={handleSaveQs} disabled={qsSaved}>
            {qsSaved ? "Saved" : "Save preferences"}
          </button>
        </div>

        <div className="landing-sub">Optionally, upload a face photo for tailored picks:</div>
        <div className="landing-card" style={{ marginTop: 8 }}>
          <div className="upload-row">
            <input type="file" accept="image/*" onChange={onFileChange} />
          </div>
          {previewUrl && (
            <div className="analysis-preview">
              <img src={previewUrl} alt="preview" className="analysis-img" />
              <div className="analysis-scores">
                {analyzing && <div className="hint">Analyzing…</div>}
                {scores && (
                  <div className="score-grid">
                    <div className="score-item"><span>Redness</span><meter min="0" max="100" value={scores.redness} /></div>
                    <div className="score-item"><span>Oiliness</span><meter min="0" max="100" value={scores.oiliness} /></div>
                    <div className="score-item"><span>Acne</span><meter min="0" max="100" value={scores.acne} /></div>
                    <div className="score-item"><span>Dryness</span><meter min="0" max="100" value={scores.dryness} /></div>
                    <div className="score-tags">{scores.tags?.join(" · ")}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          <button className="qs-save" onClick={handleSaveProfile} disabled={!scores || profileSaved}>
            {profileSaved ? "Profile saved" : "Save skin profile"}
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
