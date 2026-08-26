import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VTP Blue Waters Pune - Luxury 2, 3 & 4 BHK Residences & Townships';
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
          background: 'linear-gradient(135deg, #050914 0%, #0A1128 50%, #152238 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Subtle Luxury Gold Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(5,9,20,0) 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Top Header / Brand Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#050914',
                fontWeight: 'bold',
                fontSize: '24px',
              }}
            >
              V
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '2px', color: '#D4AF37' }}>
                VTP REALTY
              </span>
              <span style={{ fontSize: '13px', color: '#A0AEC0', letterSpacing: '1px' }}>
                PUNE&apos;S #1 AWARD-WINNING DEVELOPER
              </span>
            </div>
          </div>
          <div
            style={{
              padding: '8px 18px',
              borderRadius: '24px',
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#D4AF37',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            MahaRERA Registered & Verified
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px' }}>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: '1.15',
              color: '#FFFFFF',
              margin: '0',
            }}
          >
            VTP Blue Waters & Pegasus
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#E2E8F0',
              lineHeight: '1.4',
              margin: '0',
            }}
          >
            Ultra-Luxury 2, 3, 4 BHK Residences & Bespoke Villas across Mahalunge, Hinjawadi & Kharadi
          </p>
        </div>

        {/* Bottom Feature Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#A0AEC0', textTransform: 'uppercase' }}>Design Philosophy</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4AF37' }}>Maximum Livable Area (MLA)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#A0AEC0', textTransform: 'uppercase' }}>Township Size</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFFFFF' }}>200+ & 165+ Acres</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#A0AEC0', textTransform: 'uppercase' }}>Direct Booking</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#38A169' }}>0% Brokerage Guarantee</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: '#CBD5E0' }}>Official Portal:</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4AF37' }}>vtpbluewaters.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
