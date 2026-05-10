import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'los-titeres-de-chary',
  title: 'Los titeres de Chary',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'reemplazar-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
