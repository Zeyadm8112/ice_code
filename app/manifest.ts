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
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  }
}
