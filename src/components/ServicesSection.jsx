import { useRef } from 'react';
import { useVideoStream } from '../hooks/useVideoStream';

const IconStump = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="8" rx="8" ry="4" />
    <ellipse cx="12" cy="8" rx="4" ry="2" />
    <path d="M4 8v6c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
  </svg>
);

const IconScissors = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <path d="M8.12 8.12 12 12" />
    <path d="M20 4 8.12 15.88" />
    <circle cx="6" cy="18" r="3" />
    <path d="M14.8 14.8 20 20" />
  </svg>
);

const IconPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" /><path d="M5 12h14" />
  </svg>
);

const R2 = 'https://pub-135c9a6fdb7a48b0add9f1193570317a.r2.dev';

const SERVICES = [
  {
    key: 'mill',
    icon: <IconStump />,
    title: 'Фрезерование пней',
    price: '5 000 ₽',
    description: 'Машинная фрезеровка — самый удобный и наименее затратный способ избавиться от пней на участке. Компактная машина работает в самых стеснённых условиях и удаляет пни любых размеров. Корневая шейка разрушается, поэтому новые побеги и поросль больше не растут.',
    defaultVideo: `${R2}/gallery_video2.mp4`,
  },
  {
    key: 'chip',
    icon: <IconScissors />,
    title: 'Измельчение веток',
    price: '2 500 ₽',
    description: 'Измельчение веток в щепу заметно уменьшает объём порубочных остатков и сокращает затраты на утилизацию. Переработанный материал — натуральное удобрение, а также идёт на отсыпку клумб, садовых дорожек и т. д.',
    defaultVideo: `${R2}/gallery_video1.mp4`,
  },
];

function StreamingVideo({ src, style }) {
  const ref = useRef(null);
  const { clearingRef } = useVideoStream(ref, src);
  return <video ref={ref} muted loop playsInline poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230c1a10' width='1' height='1'/%3E%3C/svg%3E" style={style} onError={(e) => { if (!clearingRef.current) e.target.style.display = 'none'; }} />;
}

function ServiceCard({ svc, media }) {
  const effectiveMedia = media || (svc.defaultVideo ? { kind: 'video', url: svc.defaultVideo } : null);
  const hasMedia = !!effectiveMedia;
  const isVideo = hasMedia && effectiveMedia.kind === 'video';
  const isImage = hasMedia && effectiveMedia.kind === 'image';

  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform var(--dur-med) var(--ease-spring), box-shadow var(--dur-med) var(--ease-out)' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,var(--green-50),var(--border-subtle))' }}>
        {isVideo && (
          <StreamingVideo src={effectiveMedia.url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {isImage && (
          <img src={effectiveMedia.url} alt={svc.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {!hasMedia && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-600)' }}>
            {svc.icon}
          </div>
        )}
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ font: '800 18px/1.2 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)' }}>{svc.title}</div>
        <div style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>{svc.description}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
          <span style={{ font: '400 13px var(--font-body)', color: 'var(--text-muted)' }}>от</span>
          <span style={{ font: '900 20px var(--font-display)', color: 'var(--green-600)' }}>{svc.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section style={{ background: 'var(--surface-sunken)' }}>
      <div className="pv-wrap pv-pad" style={{ padding: 'clamp(48px,8vw,80px) 20px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: '700 12px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--green-600)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)', boxShadow: 'var(--glow-md)' }} />
          Услуги
        </span>
        <h2 style={{ font: '800 clamp(27px,4.6vw,42px)/1.04 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)', margin: '14px 0 0' }}>
          Дополнительные услуги
        </h2>
        <div className="pv-services" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 26 }}>
          {SERVICES.map(svc => (
            <ServiceCard key={svc.key} svc={svc} media={null} />
          ))}
        </div>
      </div>
    </section>
  );
}
