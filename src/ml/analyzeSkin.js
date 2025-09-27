// Lightweight, fully client-side skin analysis via canvas heuristics.
// Returns normalized scores (0-100) for redness, oiliness, acne-ish bumps, and dryness,
// plus derived tags to guide product recommendations.

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function rgbToHsv(r, g, b) {
  // r,g,b in [0,255] -> h in [0,360), s,v in [0,1]
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h, s, v };
}

function computeMetrics(imageData) {
  const { data, width, height } = imageData;
  const total = width * height;
  if (!total) return { redness: 0, oiliness: 0, acne: 0, dryness: 0 };

  let sumR = 0, sumG = 0, sumB = 0;
  let brightSpecular = 0; // highlights for oiliness proxy
  let lowValue = 0; // dryness proxy
  let acneCandidates = 0; // red clusters proxy

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    sumR += r; sumG += g; sumB += b;
    const { s, v } = rgbToHsv(r, g, b);

    // Oiliness heuristic: very bright but low-chroma highlights
    if (v > 0.85 && s < 0.28) brightSpecular++;

    // Dryness heuristic: darker, lower value areas (could be flaky/rough shadows)
    if (v < 0.35) lowValue++;

    // Acne heuristic: red-dominant pixels
    if (r > g + 18 && r > b + 18 && v > 0.2 && v < 0.9) acneCandidates++;
  }

  const avgR = sumR / total, avgG = sumG / total, avgB = sumB / total;
  // Redness: average red dominance over green/blue
  const redDom = Math.max(0, (avgR - (avgG + avgB) / 2) / 255);

  // Normalize proxies to 0..1 by ratio
  const oiliness01 = clamp01(brightSpecular / total * 5); // amplify a bit
  const dryness01 = clamp01(lowValue / total * 2.5);
  const acne01 = clamp01(acneCandidates / total * 3);
  const redness01 = clamp01(redDom * 3);

  return {
    redness: Math.round(redness01 * 100),
    oiliness: Math.round(oiliness01 * 100),
    acne: Math.round(acne01 * 100),
    dryness: Math.round(dryness01 * 100),
  };
}

export async function analyzeSkin(fileOrImage) {
  // Accepts a File/Blob or an HTMLImageElement/CanvasImageSource
  const img = await (async () => {
    if (typeof window === "undefined") throw new Error("Browser only");
    if (fileOrImage && fileOrImage instanceof HTMLImageElement) return fileOrImage;
    if (fileOrImage && fileOrImage instanceof Blob) {
      const url = URL.createObjectURL(fileOrImage);
      try {
        const image = await new Promise((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = url;
        });
        return image;
      } finally {
        // Revoke after drawing
      }
    }
    throw new Error("Unsupported input to analyzeSkin");
  })();

  // Draw to an offscreen canvas at a manageable size
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  // Cover fit
  const ratio = Math.max(size / img.width, size / img.height);
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);
  const dx = Math.round((size - w) / 2);
  const dy = Math.round((size - h) / 2);
  ctx.drawImage(img, dx, dy, w, h);
  const imageData = ctx.getImageData(0, 0, size, size);
  const scores = computeMetrics(imageData);

  // Derived tags for simpler downstream logic
  const tags = [];
  if (scores.oiliness >= 60) tags.push("oily");
  if (scores.dryness >= 60) tags.push("dry");
  if (scores.acne >= 45) tags.push("acne-prone");
  if (scores.redness >= 60 || scores.acne >= 55) tags.push("sensitive");
  if (tags.length === 0) tags.push("balanced");

  return { ...scores, tags };
}

export function categorizeSkin(scores) {
  // Convenience wrapper if only scores are present
  const tags = [];
  if (scores.oiliness >= 60) tags.push("oily");
  if (scores.dryness >= 60) tags.push("dry");
  if (scores.acne >= 45) tags.push("acne-prone");
  if (scores.redness >= 60 || scores.acne >= 55) tags.push("sensitive");
  if (tags.length === 0) tags.push("balanced");
  return tags;
}

export default { analyzeSkin, categorizeSkin };
