export default {
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Surtidos', value: 'Surtidos' },
          { title: 'Animales', value: 'Animales' },
          { title: 'Dinosaurios', value: 'Dinosaurios' },
          { title: 'Personajes', value: 'Personajes' },
          { title: 'Otros', value: 'Otros' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Opcional. Los numeros mas bajos aparecen primero.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
}
