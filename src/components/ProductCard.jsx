function getProductAlt(product) {
  const categoryText = product.category ? ` de la categoría ${product.category}` : ''
  return `${product.name}: títere artesanal hecho a mano${categoryText}`
}

export default function ProductCard({ product, onOpen, index = 0 }) {
  return (
    <article>
      <button className="product-card" type="button" onClick={() => onOpen(product)} style={{ '--card-index': index }}>
        <img src={product.image} alt={getProductAlt(product)} loading="lazy" />
        <span className="category-pill">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </button>
    </article>
  )
}
