import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ICE CODE',
    short_name: 'ICE CODE',
    description: 'Cutting-edge software development agency — mobile apps, web platforms, AI products, and branding.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
