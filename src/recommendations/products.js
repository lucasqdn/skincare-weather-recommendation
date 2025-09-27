// Product database for conditions
const productDatabase = {
  dry: [
    {
      name: "CeraVe Moisturizing Cream",
      brand: "CeraVe",
      link: "https://example.com/cerave-moisturizing-cream",
      image: "https://example.com/images/cerave-moisturizing-cream.jpg",
    },
    {
      name: "Aquaphor Healing Ointment",
      brand: "Aquaphor",
      link: "https://example.com/aquaphor-healing-ointment",
      image: "https://example.com/images/aquaphor-healing-ointment.jpg",
    },
  ],
  humid: [
    {
      name: "Neutrogena Hydro Boost Water Gel",
      brand: "Neutrogena",
      link: "https://example.com/neutrogena-hydro-boost",
      image: "https://example.com/images/neutrogena-hydro-boost.jpg",
    },
    {
      name: "La Roche-Posay Effaclar Mat",
      brand: "La Roche-Posay",
      link: "https://example.com/effaclar-mat",
      image: "https://example.com/images/effaclar-mat.jpg",
    },
  ],
  sunny: [
    {
      name: "EltaMD UV Clear Broad-Spectrum SPF 46",
      brand: "EltaMD",
      link: "https://example.com/eltamd-uv-clear",
      image: "https://example.com/images/eltamd-uv-clear.jpg",
    },
    {
      name: "Supergoop! Unseen Sunscreen SPF 40",
      brand: "Supergoop!",
      link: "https://example.com/supergoop-unseen-sunscreen",
      image: "https://example.com/images/supergoop-unseen-sunscreen.jpg",
    },
  ],
};

export function recommendProducts(current) {
  const out = [];
  if (current.humidity < 30) out.push(...productDatabase.dry);
  else if (current.humidity > 70) out.push(...productDatabase.humid);
  if (current.uvIndex && current.uvIndex > 3) out.push(...productDatabase.sunny);
  return out;
}

export default { recommendProducts, productDatabase };
