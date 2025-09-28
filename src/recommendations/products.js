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
      link: "https://www.stylevana.com/en_CA/deal-cosrx-bha-blackhead-power-liquid-100ml.html?___store=bwsvcab_en&utm_source=google&utm_medium=cpc&utm_campaign=21542856954&utm_term=&device=c&gad_source=1&gad_campaignid=21549356090&gbraid=0AAAAACgtEnDoiVF60QKfcilm5dA-W5Lay&gclid=CjwKCAjwlt7GBhAvEiwAKal0cq5lE3jek7oZM6uxXK7VkRJmBcyUWcPLOZz9iIhiSJK_e1Ayf_S08BoCF68QAvD_BwE",
      image: "https://sv5-cdn.stylevana.com/media/catalog/product/cache/56c900fad0fd1dcb87b3e5ee2186e9a0/c/o/cosrx-bha-blackhead-power-liquid-100ml-718.jpg",
      tag: "Acne-prone Skin",
    },
    {
      name: "Adapalene Gel 0.1%",
      brand: "Differin",
      link: "https://ca.iherb.com/pr/differin-adapalene-gel-0-1-acne-treatment-fragrance-free-0-5-oz-15-g/86314?gad_campaignid=818099273&gad_source=1&gclid=CjwKCAjwlt7GBhAvEiwAKal0cqAUA7TNHj9VlnDG5_LinNw0zfJx6vL42ZskuI4MxvR-H6SYz4TgGRoCkPYQAvD_BwE&gclsrc=aw.ds",
      image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/dif/dif92030/v/41.jpg",
      tag: "Acne-prone Skin",
    },
  ],
  oily_skin: [
    {
      name: "Green Tea Seed Hyaluronic Cream",
      brand: "Innisfree",
      link: "https://www.amazon.com/Innisfree-Hyaluronic-Hydrating-Moisturizer-Fragrance/dp/B0B5J9G6QW",
      image: "https://m.media-amazon.com/images/I/61d1v+U3mXL._SX679_.jpg",
      tag: "Oily Skin",
    },
    {
      name: "Oil-Free Ultra-Moisturizing Lotion",
      brand: "COSRX",
      link: "https://www.amazon.ca/innisfree-Hyaluronic-Ceramides-Hydrating-Moisturizer/dp/B0CW7M2VBN/ref=asc_df_B0CW7M2VBN?mcid=190f1b93044d34298bd44ef945cbfafa&tag=googleshopc0c-20&linkCode=df0&hvadid=706725225090&hvpos=&hvnetw=g&hvrand=15805138837946640113&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-2295958495619&hvocijid=15805138837946640113-B0CW7M2VBN-&hvexpln=0&gad_source=1&th=1",
      image: "https://m.media-amazon.com/images/I/61U2jfHQMKL._SX522_.jpg",
      tag: "Oily Skin",
    },
  ],
    dry_skin: [
    {
      name: "Red Erasing Cream ",
      brand: "Medicube",
      link: "https://www.stylevana.com/en_CA/deal-medicube-red-erasing-cream-100ml95038.html?___store=bwsvcab_en&utm_source=google&utm_medium=cpc&utm_campaign=21542856954&utm_term=&device=c&gad_source=1&gad_campaignid=21549356090&gbraid=0AAAAACgtEnDoiVF60QKfcilm5dA-W5Lay&gclid=CjwKCAjwlt7GBhAvEiwAKal0cr0jghV03BKEmxn3rqRKWX2YZiQwZmBszabLvFy-aGEPyp0nNXPfCRoC8eQQAvD_BwE",
      image: "https://sv5-cdn.stylevana.com/media/catalog/product/cache/56c900fad0fd1dcb87b3e5ee2186e9a0/m/e/medicube-red-erasing-cream-100ml-858.jpg",
      tag: "Dry Skin",
    },
    {
      name: "Intensive Cream",
      brand: "Zeroid",
      link: "https://skin-seoul.com/product/zeroid-intensive-cream/?currency=CAD&country=CA&gad_source=1&gad_campaignid=22437923166&gbraid=0AAAAA98BjCK3ryOu7Hu2RXvpxRwUMVuhK&gclid=CjwKCAjwlt7GBhAvEiwAKal0cuThaiZi9tubpjyJ5nbAjJBq36uywRlFQ6XOjWs4EKD9u8mxvnBA4hoC-vgQAvD_BwE",
      image: "https://prod.skin-seoul.com/wp-content/uploads/2024/05/thu_100006446_1-1.webp",
      tag: "Dry Skin",
    },
  ],
    combination_skin: [
    {
      name: "Inteca Soothing Cream Set",
      brand: "make p:rem",
      link: "https://skin-seoul.com/product/make-prem-inteca-soothing-cream-set-80ml31ml/?attribute_size=80ml%2B31ml&attribute_pack=1set&currency=CAD&country=CA&gad_source=1&gad_campaignid=22437923166&gbraid=0AAAAA98BjCK3ryOu7Hu2RXvpxRwUMVuhK&gclid=CjwKCAjwlt7GBhAvEiwAKal0cj_HJj6D1SKzu141nydVWisPev709yLNv7vDKJbWhqCWk_OBEQjj5RoCtYQQAvD_BwE",
      image: "https://prod.skin-seoul.com/wp-content/uploads/2024/05/thu_100007069_1-1.webp",
      tag: "Combination Skin",
    },
    {
      name: "Pine Calming Cica Cream",
      brand: "round lab",
      link: "https://www.yesstyle.com/en/tcuc.CAD/coc.CA/info.html/pid.1123980099?googtrans=en&utm_source=GoogleAds&utm_campaign=20992990947&utm_term=&utm_content=162190712281_690082444240&utm_medium=Shopping&bac=FHDLIVHL&mcg=paidsearch&gad_source=1&gad_campaignid=20992990947&gbraid=0AAAAAD3WTkmx0nfBIUX9occmd25RWfbH_&gclid=CjwKCAjwlt7GBhAvEiwAKal0crkE_iXdroM1NGSqfhmjc11tA9z9ytOvezuSQiYqGBoCnhGarvk0VBoCwHIQAvD_BwE",
      image: "https://d1flfk77wl2xk4.cloudfront.net/Assets/round-lab-pine-calming-cica-cream-50ml/78/948/XXL_p0198194878.jpg",
      tag: "Combination Skin",},
  ]
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
  if (tags.includes("oily")) out.push(...productDatabase.oily_skin);
  if (tags.includes("sensitive")) out.push(...productDatabase.sensitive_skin);
  if (tags.includes("dry")) out.push(...productDatabase.dry_skin);
  if (tags.includes("combination")) out.push(...productDatabase.combination_skin);


  return dedupe(out);
}

export default { recommendProducts, productDatabase };
