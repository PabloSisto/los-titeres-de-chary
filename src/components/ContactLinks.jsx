import { Instagram, Mail, MessageCircle, PlayCircle, Store } from 'lucide-react'

const iconByChannel = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
  youtube: PlayCircle,
  mercadolibre: Store,
}

export default function ContactLinks({ channels, variant = 'default' }) {
  return (
    <div className={`contact-links contact-links-${variant}`}>
      {channels.map(({ key, label, href, newTab, icon, ariaLabel }) => {
        const Icon = iconByChannel[icon]

        return (
          <a
            key={key}
            href={href}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel ?? label}
          >
            <Icon size={18} />
            <span>{label}</span>
          </a>
        )
      })}
    </div>
  )
}
