const KEY = "skincare_weather_questionnaire";
const PROFILE_KEY = "skincare_weather_skin_profile";

export function saveQuestionnaire(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
  } catch (e) {
    // ignore
  }
}

export function getQuestionnaire() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveSkinProfile(profile) {
  try {
    const payload = { ...profile, savedAt: Date.now() };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(payload));
  } catch (e) {
    // ignore
  }
}

export function getSkinProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
