import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function FeaturedCarousel({ products, onOpen }) {
  const [index, setIndex] = useState(0)
  const product = products[index]

  if (!product) return null

  const goToPrevious = () => setIndex((current) => (current === 0 ? products.length - 1 : current - 1))
  const goToNext = () => setIndex((current) => (current === products.length - 1 ? 0 : current + 1))

  return (
    <div className="carousel">
      <button className="icon-button" type="button" onClick={goToPrevious} aria-label="Producto anterior">
        <ChevronLeft size={22} />
      </button>

      <button className="featured-card" type="button" onClick={() => onOpen(product)}>
        <img src={product.image} alt={product.name} />
        <span className="category-pill">{product.category}</span>
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </button>

      <button className="icon-button" type="button" onClick={goToNext} aria-label="Producto siguiente">
        <ChevronRight size={22} />
      </button>

      <div className="carousel-dots" aria-label="Indicador de productos destacados">
        {products.map((item, itemIndex) => (
          <button
            key={item.id}
            className={itemIndex === index ? 'active' : ''}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`Ver ${item.name}`}
          />
        ))}
      </div>
    </div>
  )
}
