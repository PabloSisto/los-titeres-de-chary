import { useEffect, useMemo, useState } from 'react'
import { categories } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

const transitionDurationMs = 180

export default function ProductGallery({ products, onOpen }) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [displayedCategory, setDisplayedCategory] = useState('Todos')
  const [transitionStage, setTransitionStage] = useState('enter')

  const filteredProducts = useMemo(() => {
    if (displayedCategory === 'Todos') return products
    return products.filter((product) => product.category === displayedCategory)
  }, [displayedCategory, products])

  useEffect(() => {
    if (activeCategory === displayedCategory) {
      const frame = window.requestAnimationFrame(() => {
        setTransitionStage('enter')
      })

      return () => window.cancelAnimationFrame(frame)
    }

    setTransitionStage('exit')

    const timeout = window.setTimeout(() => {
      setDisplayedCategory(activeCategory)
      setTransitionStage('enter')
    }, transitionDurationMs)

    return () => window.clearTimeout(timeout)
  }, [activeCategory, displayedCategory])

  return (
    <>
      <div className="filters" aria-label="Filtrar por categoria">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={`product-grid product-grid-${transitionStage}`}>
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} onOpen={onOpen} index={index} />
        ))}
      </div>
    </>
  )
}
