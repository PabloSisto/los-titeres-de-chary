# Los títeres de Chary

Página web de presentación para un emprendimiento de títeres y productos artesanales hechos a mano. Está hecha con React + Vite y preparada para leer productos desde Sanity CMS, con datos locales de respaldo mientras el CMS no esté configurado.

## Requisitos

- Node.js 18 o superior.
- npm.
- Una cuenta de Sanity si querés administrar productos desde el CMS.

## Instalación

```bash
npm install
```

## Correr el proyecto

```bash
npm run dev
```

Vite mostrará una URL local, normalmente `http://localhost:5173`.

## Configurar variables de entorno

Copiá `.env.example` como `.env`:

```bash
cp .env.example .env
```

En Windows PowerShell también podés crear el archivo manualmente o usar:

```powershell
Copy-Item .env.example .env
```

Completá estos valores:

```env
VITE_SANITY_PROJECT_ID=tu_project_id
VITE_SANITY_DATASET=production
```

Si no configurás Sanity, la web usa los productos locales de `src/data/products.js`.

## Configurar Sanity

El schema de producto está en `sanity/schemas/product.js` e incluye:

- nombre
- descripción
- imagen
- categoría
- destacado
- orden opcional

El proyecto deja listo el schema en `sanity/schemas/product.js`. Si querés correr Sanity Studio dentro de esta misma carpeta, instalá primero el paquete de Studio:

```bash
npm install -D sanity
```

Después podés levantarlo con:

```bash
npx sanity dev
```

Antes de usarlo, reemplazá en `sanity.config.js` el `projectId` o definí estas variables de entorno para el Studio:

```env
SANITY_STUDIO_PROJECT_ID=tu_project_id
SANITY_STUDIO_DATASET=production
```

También podés crear o conectar el proyecto desde Sanity con:

```bash
npm create sanity@latest
```

Si ya tenés un proyecto Sanity creado, usá su `projectId` y dataset.

## Cargar productos

En Sanity Studio:

1. Abrí el Studio con `npm run studio`.
2. Creá un documento de tipo `Producto`.
3. Cargá nombre, descripción, imagen y categoría.
4. Marcá `Destacado` para que aparezca en el carrusel de inicio.
5. Usá `Orden` si querés controlar el orden de aparición.

Categorías disponibles:

- Surtidos
- Animales
- Dinosaurios
- Personajes
- Otros

## Contacto

Los enlaces de WhatsApp, Instagram, email y Facebook están definidos en `src/App.jsx`, dentro del objeto `contact`.

Reemplazá los valores de ejemplo por los enlaces reales del emprendimiento.

## Build

```bash
npm run build
```

El sitio compilado queda en `dist`.

## Deploy recomendado

### Vercel

1. Subí el proyecto a GitHub.
2. Importalo desde Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Agregá `VITE_SANITY_PROJECT_ID` y `VITE_SANITY_DATASET` en Environment Variables.

### Netlify

1. Subí el proyecto a GitHub.
2. Creá un nuevo site desde Netlify.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Agregá `VITE_SANITY_PROJECT_ID` y `VITE_SANITY_DATASET` en Environment variables.

## Estructura principal

```text
src/
  components/       Componentes reutilizables
  data/             Productos fallback y categorías
  lib/              Cliente y consultas de Sanity
  App.jsx           Layout principal
  styles.css        Estilos responsive
sanity/
  schemas/          Schemas del CMS
public/images/      Imágenes locales usadas por la web
```
