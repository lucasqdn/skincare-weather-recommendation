// Product database for weather and skin conditions
const productDatabase = {
  dry: [
    {
      name: "Cicaplast Baume B5",
      brand: "La Roche Posay",
      link: "https://www.laroche-posay.ca/en_CA/body-care/body-skin-concerns/body-dry-to-very-dry-skin/cicaplast-baume-b5-soothing-relieving-balm/cicaplast-baume-b5.html?srsltid=AfmBOorLQZHDaI4eJg4PO_3KfRasJWRtQPVi5EHC7azNcuyWwzwE4XxK",
      image: "https://www.laroche-posay.ca/dw/image/v2/AATL_PRD/on/demandware.static/-/Sites-larocheposay-master-catalog/default/dwdae1bbc9/2024/cicaplast-baume-b5/cicaplast-1.jpg?sw=1580&sh=1580&sm=cut&sfrm=jpg&q=70",
      tag: "Dry Weather",
    },
    {
      name: "ATOBARRIER365 Cream Moisturizer", 
      brand: "AESTURA",
      link: "https://www.amazon.com/AESTURA-ATOBARRIER365-Hydration-Moisturizer-Sensitive/dp/B09YDCCJBJ",
      image: "https://m.media-amazon.com/images/I/61LwBIkkFgL._SX679_.jpg",
      tag: "Dry Weather",
    },
  ],
  humid: [
    {
      name: "AQUA SQUALANE MOISTURIZING CREAM",
      brand: "S.NATURE",
      link: "https://www.amazon.ca/MOISTURIZING-Moisturizer-Sensitive-Long-lasting-Hydration/dp/B09KV5LCVH/ref=asc_df_B09KV5LCVH?mcid=93eadf9edaf632bfbbc9fad270dbdc0d&tag=googleshopc0c-20&linkCode=df0&hvadid=730944436937&hvpos=&hvnetw=g&hvrand=15695395763984379590&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-1930171057382&psc=1&hvocijid=15695395763984379590-B09KV5LCVH-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/41wfJJ4WZGL._AC_.jpg",
      tag: "Humid Weather",
    },
    {
      name: "Round Lab Birch Juice Moisturizing Cream 80ml",
      brand: "Round Lab",
      link: "https://www.amazon.ca/Round-Birch-Juice-Moisturizing-Cream/dp/B081VS3F27/ref=asc_df_B081VS3F27?mcid=906a80b70cc530cd90ac211b904870a3&tag=googleshopc0c-20&linkCode=df0&hvadid=706725225090&hvpos=&hvnetw=g&hvrand=2415270943412991361&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-872295009015&psc=1&hvocijid=2415270943412991361-B081VS3F27-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/51XqBKQtprL._AC_SX679_.jpg",
      tag: "Humid Weather",
    },
  ],
  sunny: [
    {
      name: "Torriden DIVE-IN Mild Sun Cream",
      brand: "Torriden",
      link: "https://www.amazon.ca/Torriden-DIVE-Mineral-Sunscreen-Fragrance-Free/dp/B0B11MF88C/ref=asc_df_B0B11MF88C?mcid=1feb40400dcd3a238fef49a2d0fe01ea&tag=googleshopc0c-20&linkCode=df0&hvadid=706725343107&hvpos=&hvnetw=g&hvrand=7168080736201207620&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-1665044044721&psc=1&hvocijid=7168080736201207620-B0B11MF88C-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/61vlTwUMtNL._AC_SX679_.jpg",
      tag: "Sunny Weather",
    },
    {
      name: "Round Lab, Birch Juice Moisturizing UVLock Sunscreen",
      brand: "Round Lab",
      link: "https://ca.iherb.com/pr/round-lab-birch-juice-moisturizing-uvlock-sunscreen-spf-45-1-69-fl-oz-50-ml/146043?gad_campaignid=818099273&gad_source=1&gclid=CjwKCAjwlt7GBhAvEiwAKal0chToInxznSa_7SHQ1wQhqg9nxKxzazDvaddpKrAR6H9I0tw9nSM7bRoCiAYQAvD_BwE&gclsrc=aw.ds",
      image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/rdb/rdb54119/v/20.jpg",
      tag: "Sunny Weather",
    },
  ],
  acne: [
    {
      name: "BHA Blackhead Power Liquid",
      brand: "COSRX",
      link: "https://www.amazon.com/COSRX-Blackhead-Power-Liquid-3-38/dp/B00OZE0G8G",
      image: "https://m.media-amazon.com/images/I/51Kf9p8bIUL._SX679_.jpg",
    },
    {
      name: "Adapalene Gel 0.1%",
      brand: "Differin",
      link: "https://www.amazon.com/Differin-Adapalene-Treatment-Acne-Prone-Fragrance-Free/dp/B07FF2018M",
      image: "https://m.media-amazon.com/images/I/51b3+I7bKfL._SX679_.jpg",
    },
  ],
  oily: [
    {
      name: "Green Tea Seed Hyaluronic Cream",
      brand: "Innisfree",
      link: "https://www.amazon.com/Innisfree-Hyaluronic-Hydrating-Moisturizer-Fragrance/dp/B0B5J9G6QW",
      image: "https://m.media-amazon.com/images/I/61d1v+U3mXL._SX679_.jpg",
    },
    {
      name: "Oil-Free Ultra-Moisturizing Lotion",
      brand: "COSRX",
      link: "https://www.amazon.com/COSRX-Moisturizing-Lotion-Hyaluronic-Amorepacific/dp/B01CLTKI4O",
      image: "https://m.media-amazon.com/images/I/51Ykgu8k7aL._SX679_.jpg",
    },
  ],
  sensitive: [
    {
      name: "SoonJung 2x Barrier Intensive Cream",
      brand: "ETUDE",
      link: "https://www.amazon.com/ETUDE-SoonJung-Barrier-Intensive-Hypoallergenic/dp/B07HJ67G5Q",
      image: "https://m.media-amazon.com/images/I/51g62qkC2HL._SX679_.jpg",
    },
    {
      name: "Tolériane Ultra Soothing Care",
      brand: "La Roche-Posay",
      link: "https://www.amazon.com/La-Roche-Posay-Toleriane-Soothing-Intense/dp/B003PHN2CU",
      image: "https://m.media-amazon.com/images/I/51NHO0gG0ML._SX679_.jpg",
    },
  ],
};

function dedupe(products) {
  const seen = new Set();
  const res = [];
  for (const p of products) {
    const key = `${p.brand}|${p.name}`;
    if (!seen.has(key)) { seen.add(key); res.push(p); }
  }
  return res;
}

export function recommendProducts(current, skinProfile) {
  const out = [];
  // Weather-driven
  if (current.humidity < 30) out.push(...productDatabase.dry);
  else if (current.humidity > 70) out.push(...productDatabase.humid);
  if (current.uvIndex && current.uvIndex > 3) out.push(...productDatabase.sunny);

  // Skin-profile driven
  const tags = skinProfile?.tags || [];
  if (tags.includes("acne-prone")) out.push(...productDatabase.acne);
  if (tags.includes("oily")) out.push(...productDatabase.oily);
  if (tags.includes("sensitive")) out.push(...productDatabase.sensitive);
  if (tags.includes("dry")) out.push(...productDatabase.dry);

  return dedupe(out);
}

export default { recommendProducts, productDatabase };
