// Product database for conditions
const productDatabase = {
  dry: [
    {
      name: "Cicaplast Baume B5",
      brand: "La Roche Posay",
      link: "https://www.laroche-posay.ca/en_CA/body-care/body-skin-concerns/body-dry-to-very-dry-skin/cicaplast-baume-b5-soothing-relieving-balm/cicaplast-baume-b5.html?srsltid=AfmBOorLQZHDaI4eJg4PO_3KfRasJWRtQPVi5EHC7azNcuyWwzwE4XxK",
      image: "https://www.laroche-posay.ca/dw/image/v2/AATL_PRD/on/demandware.static/-/Sites-larocheposay-master-catalog/default/dwdae1bbc9/2024/cicaplast-baume-b5/cicaplast-1.jpg?sw=1580&sh=1580&sm=cut&sfrm=jpg&q=70",
    },
    {
      name: "ATOBARRIER365 Cream Moisturizer", 
      brand: "AESTURA",
      link: "https://www.amazon.com/AESTURA-ATOBARRIER365-Hydration-Moisturizer-Sensitive/dp/B09YDCCJBJ",
      image: "https://m.media-amazon.com/images/I/61LwBIkkFgL._SX679_.jpg",
    },
  ],
  humid: [
    {
      name: "AQUA SQUALANE MOISTURIZING CREAM",
      brand: "S.NATURE",
      link: "https://www.amazon.ca/MOISTURIZING-Moisturizer-Sensitive-Long-lasting-Hydration/dp/B09KV5LCVH/ref=asc_df_B09KV5LCVH?mcid=93eadf9edaf632bfbbc9fad270dbdc0d&tag=googleshopc0c-20&linkCode=df0&hvadid=730944436937&hvpos=&hvnetw=g&hvrand=15695395763984379590&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-1930171057382&psc=1&hvocijid=15695395763984379590-B09KV5LCVH-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/41wfJJ4WZGL._AC_.jpg",
    },
    {
      name: "Round Lab Birch Juice Moisturizing Cream 80ml",
      brand: "Round Lab",
      link: "https://www.amazon.ca/Round-Birch-Juice-Moisturizing-Cream/dp/B081VS3F27/ref=asc_df_B081VS3F27?mcid=906a80b70cc530cd90ac211b904870a3&tag=googleshopc0c-20&linkCode=df0&hvadid=706725225090&hvpos=&hvnetw=g&hvrand=2415270943412991361&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-872295009015&psc=1&hvocijid=2415270943412991361-B081VS3F27-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/51XqBKQtprL._AC_SX679_.jpg",
    },
  ],
  sunny: [
    {
      name: "Torriden DIVE-IN Mild Sun Cream",
      brand: "Torriden",
      link: "https://www.amazon.ca/Torriden-DIVE-Mineral-Sunscreen-Fragrance-Free/dp/B0B11MF88C/ref=asc_df_B0B11MF88C?mcid=1feb40400dcd3a238fef49a2d0fe01ea&tag=googleshopc0c-20&linkCode=df0&hvadid=706725343107&hvpos=&hvnetw=g&hvrand=7168080736201207620&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001527&hvtargid=pla-1665044044721&psc=1&hvocijid=7168080736201207620-B0B11MF88C-&hvexpln=0&gad_source=1",
      image: "https://m.media-amazon.com/images/I/61vlTwUMtNL._AC_SX679_.jpg",
    },
    {
      name: "Round Lab, Birch Juice Moisturizing UVLock Sunscreen",
      brand: "Round Lab",
      link: "https://ca.iherb.com/pr/round-lab-birch-juice-moisturizing-uvlock-sunscreen-spf-45-1-69-fl-oz-50-ml/146043?gad_campaignid=818099273&gad_source=1&gclid=CjwKCAjwlt7GBhAvEiwAKal0chToInxznSa_7SHQ1wQhqg9nxKxzazDvaddpKrAR6H9I0tw9nSM7bRoCiAYQAvD_BwE&gclsrc=aw.ds",
      image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/rdb/rdb54119/v/20.jpg",
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
