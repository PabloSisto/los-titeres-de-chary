import { MessageCircle, X } from 'lucide-react'
import { useEffect } from 'react'
import { buildWhatsAppHref } from '../data/contact.js'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    if (product) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, product])

  if (!product) return null

  const whatsappHref = buildWhatsAppHref(`Hola Chary, quisiera consultar por el producto ${product.name}`)

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>
        <div className="modal-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-content">
          <span className="category-pill">{product.category}</span>
          <h2 id="modal-title">{product.name}</h2>
          <p>{product.description}</p>
          <a className="modal-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
