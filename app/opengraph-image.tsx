import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Greenstar Solar - Premium Solar Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Logo Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <img
            src="https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"
            alt="Greenstar Solar"
            width="600"
            height="150"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(140, 198, 63, 0.4))',
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          Premium Solar & Battery Storage Solutions
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            fontWeight: 400,
          }}
        >
          Expert Installation Across the UK
        </div>

        {/* Accent Line */}
        <div
          style={{
            width: '400px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #8cc63f, transparent)',
            marginTop: '40px',
            borderRadius: '2px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
