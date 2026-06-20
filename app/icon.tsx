import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png'

export default async function Icon() {
  const logoData = await fetch(LOGO_URL).then((r) => r.arrayBuffer())
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logoBase64} width={32} height={32} alt="" />,
    { ...size },
  )
}
