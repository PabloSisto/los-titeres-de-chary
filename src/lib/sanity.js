import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const isSanityConfigured = Boolean(projectId && dataset)

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-05-06',
      useCdn: true,
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source) {
  return builder?.image(source)
}

export async function getProductsFromSanity() {
  if (!sanityClient) return []

  const query = `*[_type == "product"] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    description,
    category,
    featured,
    order,
    image
  }`

  const products = await sanityClient.fetch(query)

  return products.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    category: product.category,
    featured: Boolean(product.featured),
    order: product.order,
    image: product.image ? urlFor(product.image).width(1200).height(900).fit('crop').url() : '',
  }))
}
