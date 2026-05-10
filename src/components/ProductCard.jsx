export default function ProductCard({ product, onOpen, index = 0 }) {
  return (
    <button className="product-card" type="button" onClick={() => onOpen(product)} style={{ '--card-index': index }}>
      <img src={product.image} alt={product.name} />
      <span className="category-pill">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </button>
  )
}
