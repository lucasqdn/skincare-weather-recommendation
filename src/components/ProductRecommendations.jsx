export default function ProductRecommendations({ products }) {
  if (!products || products.length === 0) return null;
  return (
    <div className="card products">
      <h2>Recommended Products</h2>
      <div className="products-grid">
        {products.map((p, i) => (
          <a className="product" href={p.link} key={i} target="_blank" rel="noreferrer">
            <div className="product-image-wrap">
              <img className="product-image" src={p.image} alt={p.name} />
            </div>
            <div className="product-info">
              <div className="product-brand">{p.brand}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-cta">View</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
