import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, MessageCircle, Package, Sparkles } from 'lucide-react'
import ContactLinks from './components/ContactLinks.jsx'
import FeaturedCarousel from './components/FeaturedCarousel.jsx'
import ProductGallery from './components/ProductGallery.jsx'
import ProductModal from './components/ProductModal.jsx'
import { buildWhatsAppHref, enabledContactChannels } from './data/contact.js'
import { fallbackProducts } from './data/products.js'
import { getProductsFromSanity, isSanityConfigured } from './lib/sanity.js'

export default function App() {
  const [products, setProducts] = useState(fallbackProducts)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const topbarRef = useRef(null)

  useEffect(() => {
    let ignore = false

    async function loadProducts() {
      try {
        const sanityProducts = await getProductsFromSanity()
        if (!ignore && sanityProducts.length > 0) {
          setProducts(sanityProducts)
        }
      } catch (error) {
        console.warn('No se pudieron cargar productos desde Sanity. Se usan datos locales.', error)
      }
    }

    if (isSanityConfigured) {
      loadProducts()
    }

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const topbarElement = topbarRef.current
    if (!topbarElement) return undefined

    const updateTopbarOffset = () => {
      document.documentElement.style.setProperty('--topbar-offset', `${topbarElement.offsetHeight}px`)
    }

    updateTopbarOffset()

    const ResizeObserverConstructor = window.ResizeObserver
    const resizeObserver = ResizeObserverConstructor ? new ResizeObserverConstructor(updateTopbarOffset) : null
    resizeObserver?.observe(topbarElement)
    window.addEventListener('resize', updateTopbarOffset)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateTopbarOffset)
      document.documentElement.style.removeProperty('--topbar-offset')
    }
  }, [])

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [products],
  )
  const emailChannel = enabledContactChannels.find((channel) => channel.key === 'email')
  const youtubeChannel = enabledContactChannels.find((channel) => channel.key === 'youtube')
  const mercadoLibreChannel = enabledContactChannels.find((channel) => channel.key === 'mercadolibre')
  const floatingWhatsAppHref = buildWhatsAppHref('Hola Chary. Quisiera hacer una consulta sobre los títeres.')
  const storyPhrases = [
    'Hechos para imaginar',
    'Cada personaje tiene su historia',
    'Más juego, menos pantallas',
  ]

  return (
    <div className="site-shell">
      <header ref={topbarRef} className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>Los Títeres de Chary</span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#galeria">Galería</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-media">
            <img
              src="/images/stand-optimized.webp"
              alt="Espectáculo infantil de títeres artesanales en Buenos Aires"
              fetchPriority="high"
            />
          </div>
          <div className="hero-content">
            <span className="eyebrow">
              <Heart size={16} />
              Hecho a mano
            </span>
            <h1>Los Títeres de Chary</h1>
            <p className="hero-subtitle">Espectáculos infantiles y títeres artesanales hechos a mano en Argentina</p>
            <p className="hero-copy">
              Shows de títeres para cumpleaños infantiles, jardines de infantes, escuelas primarias y eventos
              para niños en Buenos Aires, con personajes únicos para jugar, aprender e imaginar.
            </p>
          </div>
        </section>

        <section className="section intro-section" aria-label="Presentación">
          <div className="intro-media">
            <img
              src="/images/chary-hero.png"
              alt="Chary con sus títeres artesanales hechos a mano"
              loading="lazy"
            />
          </div>
          <div className="intro-copy">
            <div className="section-heading">
              <h2>Pequeñas creaciones para grandes historias</h2>
            </div>
            <div className="intro-text">
              <p>
                Mi nombre es Chary y soy artesana. Cada títere nace de mis manos con paciencia, color y
                mucho cariño, pensado para acompañar juegos, cuentos, cumpleaños infantiles y momentos
                compartidos.
              </p>
              <p>
                Los títeres y marionetas están creados para jugar, imaginar, representar historias y
                compartir momentos únicos donde, por un instante, dejamos de lado las pantallas y volvemos
                a un mundo de creatividad, emoción y juego como en otras épocas.
              </p>
              <p>
                Familias, docentes, jardines de infantes y escuelas primarias eligen estos personajes como
                herramientas para estimular la imaginación, la memoria, la expresión y el aprendizaje a
                través de títeres artesanales llenos de ternura y personalidad propia.
              </p>
              <p>
                Cada producto se realiza con dedicación en Argentina, combinando texturas suaves, colores
                alegres y detalles pensados para que cada títere tenga su propia magia.
              </p>
            </div>
          </div>
        </section>

        <div className="phrase-strip" aria-label="Frases artesanales">
          {storyPhrases.map((phrase) => (
            <span key={phrase}>{phrase}</span>
          ))}
        </div>

        <section className="section featured-section" aria-labelledby="destacados-title">
          <div className="section-heading">
            <span className="section-kicker">Destacados</span>
            <h2 id="destacados-title">Los más pedidos</h2>
          </div>
          <FeaturedCarousel products={featuredProducts.length ? featuredProducts : products} onOpen={setSelectedProduct} />
        </section>

        <section className="section gallery-band" id="galeria" aria-labelledby="galeria-title">
          <div className="section-heading">
            <span className="section-kicker">Galería</span>
            <h2 id="galeria-title">Todos los productos</h2>
          </div>
          <ProductGallery products={products} onOpen={setSelectedProduct} />
        </section>

        <div className="phrase-strip phrase-strip-soft" aria-label="Frases de juego">
          <span>Creando recuerdos desde hace años</span>
          <span>Más ternura, más historias, más juego</span>
        </div>

        <section className="section contact-section" id="contacto" aria-labelledby="contacto-title">
          <div className="section-heading">
            <span className="section-kicker">Contacto</span>
            <h2 id="contacto-title">Consultas y pedidos</h2>
          </div>
          <div className="contact-layout">
            <div className="contact-primary">
              <p>
                Para consultar disponibilidad, pedir un diseño especial o coordinar espectáculos de títeres
                en Buenos Aires para cumpleaños, jardines, escuelas o eventos infantiles, podés escribir
                por cualquiera de estos medios.
              </p>
              <ContactLinks channels={enabledContactChannels} />
              {youtubeChannel?.note ? <p className="contact-aside">{youtubeChannel.note}</p> : null}
            </div>

            <div className="contact-secondary">
              {mercadoLibreChannel ? (
                <div className="contact-purchase-note">
                  <p>
                    Comprando directo por WhatsApp podés acceder a descuentos abonando por transferencia o
                    en efectivo.
                  </p>
                  <p>También podés encontrarnos en MercadoLibre.</p>
                  <a href={mercadoLibreChannel.href} target="_blank" rel="noopener noreferrer">
                    Ver tienda en MercadoLibre
                  </a>
                  <div className="contact-shipping-note">
                    <Package size={16} />
                    <span>Realizamos envíos a toda Argentina.</span>
                  </div>
                </div>
              ) : null}

              {emailChannel?.value ? (
                <div className="contact-email-card">
                  <span className="contact-email-label">Email de contacto</span>
                  <a href={emailChannel.href} target="_blank" rel="noopener noreferrer" className="contact-email-value">
                    {emailChannel.value}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Los Títeres de Chary</span>
        <span>Productos artesanales hechos a mano</span>
      </footer>

      <a
        className="floating-whatsapp"
        href={floatingWhatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultanos por WhatsApp"
      >
        <span className="floating-whatsapp-tooltip">Consultanos por WhatsApp</span>
        <span className="floating-whatsapp-button" aria-hidden="true">
          <MessageCircle size={22} />
        </span>
      </a>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
