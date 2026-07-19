import { useRef } from 'react';
import { useLeaves } from '../hooks/useLeaves';
import { useVideoStream } from '../hooks/useVideoStream';

const DEFAULT_VIDEO = 'https://pub-135c9a6fdb7a48b0add9f1193570317a.r2.dev/hero_bg.webm';

const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.2 1.29-1.97 1.4-.5.07-1.15.13-3.32-.72-2.79-1.1-4.58-3.94-4.72-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.24-.26.53-.32.71-.32h.5c.16.01.38-.06.59.45.24.55.81 1.9.88 2.04.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
  </svg>
);

const IconPhone = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.36 2.07.7 3.06a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.02-1.27a2 2 0 0 1 2.11-.45c.99.34 2.01.57 3.06.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMax = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" />
  </svg>
);

const CtaGroup = ({ align = 'center' }) => (
  <div data-no-hero-click="" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start', marginTop: 6 }}>
    <a className="pv-cta pv-cta--primary" href="https://wa.me/79515103366" target="_blank" rel="noopener">
      <IconWhatsApp />WhatsApp
    </a>
    <a className="pv-cta" href="tel:+79515103366">
      <IconPhone /><span className="pv-hide-sm">+7 951 510-33-66</span>
    </a>
    <a className="pv-cta" href="https://max.ru/u/f9LHodD0cOJzutV78i3x9NKIjlZllSjRd79CRyMBA2Q4rZLc2IuuyorMPdw" target="_blank" rel="noopener">
      <IconMax />MAX
    </a>
    <a className="pv-cta" href="https://instagram.com/arborist_rnd" target="_blank" rel="noopener">
      <IconInstagram />@arborist_rnd
    </a>
  </div>
);

const Badge = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, background: 'rgba(31,168,76,.18)', border: '1px solid rgba(56,224,102,.4)', color: '#CFF6DC', font: '600 12.5px/1 var(--font-body)', backdropFilter: 'blur(6px)' }}>
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--glow-green)', boxShadow: '0 0 8px var(--glow-green)' }} />
    Верёвочный доступ · Ростов и область
  </span>
);

const Headline = ({ style }) => (
  <h1 style={{ font: '800 clamp(38px,8.5vw,74px)/0.98 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: '#fff', margin: 0, textWrap: 'balance', ...style }}>
    Спил деревьев <span style={{ color: '#6FDD94' }}>любой сложности</span>
  </h1>
);

const Body = ({ style }) => (
  <p style={{ maxWidth: '54ch', color: 'rgba(255,255,255,.82)', font: '400 clamp(15px,2.3vw,19px)/1.55 var(--font-body)', margin: 0, ...style }}>
    Убираем аварийные и обычные деревья там, где нельзя ронять: над постройками, проводами, в тесноте. Своя техника, промышленный альпинизм, чистая уборка после работ.
  </p>
);

const overlays = {
  day:   'linear-gradient(180deg,rgba(10,26,14,.28) 0%,rgba(10,26,14,.38) 55%,rgba(10,26,14,.62) 100%)',
  dusk:  'linear-gradient(180deg,rgba(8,15,9,.5) 0%,rgba(8,15,9,.62) 55%,rgba(8,15,9,.82) 100%)',
  night: 'linear-gradient(180deg,rgba(2,6,4,.72) 0%,rgba(2,6,4,.8) 55%,rgba(2,6,4,.94) 100%)',
};


export default function HeroSection({ heroVariant, mood, energy, leafCount, fallingLeaves }) {
  const leavesRef = useRef(null);
  const videoRef = useRef(null);

  useLeaves(leavesRef, { fallingLeaves, leafCount, energy, mood });
  useVideoStream(videoRef, DEFAULT_VIDEO);

  return (
    <section
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', background: '#0c1a10', overflow: 'hidden' }}
    >
      <canvas ref={leavesRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <video
        ref={videoRef}
        muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      <div style={{ position: 'absolute', inset: 0, background: overlays[mood] || overlays.dusk, pointerEvents: 'none' }} />

      {heroVariant === 'center' && (
        <div className="pv-wrap pv-pad" style={{ position: 'relative', zIndex: 3, margin: 'auto', padding: '104px 20px 68px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
          <Badge />
          <Headline />
          <Body />
          <CtaGroup align="center" />
        </div>
      )}

      {heroVariant === 'split' && (
        <div className="pv-wrap pv-pad pv-split-outer" style={{ position: 'relative', zIndex: 3, margin: 'auto', padding: '104px 20px 68px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ maxWidth: 600, background: 'rgba(10,18,12,.42)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 26, padding: 'clamp(24px,4vw,38px)', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 24px 70px rgba(0,0,0,.45)' }}>
            <Badge />
            <Headline style={{ font: '800 clamp(34px,6vw,60px)/1 var(--font-display)' }} />
            <Body style={{ maxWidth: 'none' }} />
            <CtaGroup align="left" />
          </div>
        </div>
      )}

      {heroVariant === 'bottom' && (
        <div className="pv-wrap pv-pad" style={{ position: 'relative', zIndex: 3, marginTop: 'auto', width: '100%', padding: '0 20px 52px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', textAlign: 'left' }}>
          <Badge />
          <Headline style={{ font: '800 clamp(40px,10vw,88px)/0.96 var(--font-display)', maxWidth: '14ch' }} />
          <Body style={{ maxWidth: '52ch' }} />
          <CtaGroup align="left" />
        </div>
      )}

    </section>
  );
}
