const KEY = "skincare_weather_questionnaire";

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
