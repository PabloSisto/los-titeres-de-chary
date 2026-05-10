const whatsappMessage = 'Hola Chary, quisiera consultar por los títeres'
const whatsappPhone = '5492664855502'
const emailAddress = 'obrienchary@gmail.com'
const youtubeNote = 'También podés ver videos y personajes en nuestro canal de YouTube.'
const mercadoLibreHref =
  'https://listado.mercadolibre.com.ar/_CustId_546575197?item_id=MLA915414593&category_id=MLA27823&seller_id=546575197&client=recoview-selleritems&recos_listing=true'

export function buildWhatsAppHref(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
}

export const contactChannels = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    enabled: true,
    href: buildWhatsAppHref(whatsappMessage),
    newTab: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    enabled: true,
    href: 'https://www.instagram.com/lostiteresdechary?igsh=MTN1cm85Mm43NXVybQ==',
    newTab: true,
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'email',
    enabled: true,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
    value: emailAddress,
    newTab: true,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: 'youtube',
    enabled: true,
    href: 'https://www.youtube.com/watch?si=8Wc00MkbZ8ErPyts&v=808qf-HD1Yw&feature=youtu.be',
    note: youtubeNote,
    newTab: true,
  },
  {
    key: 'mercadolibre',
    label: 'MercadoLibre',
    icon: 'mercadolibre',
    enabled: true,
    href: mercadoLibreHref,
    ariaLabel: 'Ver productos en MercadoLibre',
    newTab: true,
  },
]

export const enabledContactChannels = contactChannels.filter((channel) => channel.enabled)
