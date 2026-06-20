import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ICE CODE — Software Development Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png'

export default async function OGImage() {
  const logoData = await fetch(LOGO_URL).then((r) => r.arrayBuffer())
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #050d1a 60%, #000a14 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Logo + Brand name row */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, gap: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            width={120}
            height={120}
            style={{ borderRadius: 24 }}
            alt=""
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 96, fontWeight: 800, color: '#ffffff', letterSpacing: '-3px' }}>
              ICE
            </span>
            <span style={{ fontSize: 96, fontWeight: 800, color: '#38bdf8', letterSpacing: '-3px', marginLeft: 12 }}>
              CODE
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 80, height: 3, background: '#38bdf8', borderRadius: 2, marginBottom: 28 }} />

        {/* Tagline */}
        <div style={{ fontSize: 30, color: '#cbd5e1', textAlign: 'center', maxWidth: 700, lineHeight: 1.4 }}>
          Freeze Your Worries, Let Us Handle It
        </div>

        {/* Sub-label */}
        <div style={{ fontSize: 18, color: '#475569', marginTop: 24, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Software Development Agency · Egypt
        </div>
      </div>
    ),
    { ...size },
  )
}
