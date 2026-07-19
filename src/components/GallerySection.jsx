import { useRef, useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useVideoStream } from '../hooks/useVideoStream';

const POSTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230c1a10' width='1' height='1'/%3E%3C/svg%3E";

const IconPlay = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="22" fill="rgba(0,0,0,0.45)" />
    <polygon points="17,13 35,22 17,31" fill="white" />
  </svg>
);

const IconPause = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="22" fill="rgba(0,0,0,0.3)" />
    <rect x="14" y="13" width="5" height="18" rx="1.5" fill="white" />
    <rect x="25" y="13" width="5" height="18" rx="1.5" fill="white" />
  </svg>
);

function StreamingVideo({ src, style, onError }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { clearingRef, userPlayRef } = useVideoStream(ref, src, { autoPlay: false });

  const toggle = (e) => {
    e.stopPropagation();
    const video = ref.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      userPlayRef.current = true;
      video.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted loop playsInline
        poster={POSTER}
        style={style}
        onPlay={() => setPlaying(true)}
        onPause={() => { if (!clearingRef.current) setPlaying(false); }}
        onError={() => { if (!clearingRef.current) onError?.(); }}
      />
      <button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, opacity: (!playing || hovered) ? 1 : 0, transition: 'opacity 0.2s',
        }}
      >
        {playing ? <IconPause /> : <IconPlay />}
      </button>
    </>
  );
}

function GalleryTile({ item, feedLayout }) {
  const [errored, setErrored] = useState(false);
  if (errored) return null;
  const h = feedLayout === 'grid' ? 240 : item.h;

  return (
    <div className="pv-tile" style={{ background: '#0c1a10', height: h }}>
      <StreamingVideo
        src={item.url}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export default function GallerySection({ feedLayout }) {
  const sentinelRef = useRef(null);
  const { feed, canLoadMore } = useGallery(sentinelRef);
  const feedClass = feedLayout === 'grid' ? 'pv-feed-grid' : 'pv-feed';

  return (
    <section className="pv-wrap pv-pad" style={{ padding: 'clamp(48px,8vw,80px) 20px clamp(56px,9vw,96px)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: '700 12px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--green-600)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)', boxShadow: 'var(--glow-md)' }} />
        Галерея
      </span>
      <h2 style={{ font: '800 clamp(27px,4.6vw,42px)/1.04 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)', margin: '14px 0 6px' }}>
        Наши работы
      </h2>
      <p style={{ font: '400 clamp(14px,2vw,17px)/1.5 var(--font-body)', color: 'var(--text-muted)', margin: '0 0 26px', maxWidth: '52ch' }}>
        Фото и видео с объектов — лента подгружается по мере прокрутки.
      </p>

      <div className={feedClass}>
        {feed.map(item => (
          <GalleryTile key={item.id} item={item} feedLayout={feedLayout} />
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      {canLoadMore && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '28px 0 4px', color: 'var(--text-muted)', font: '600 14px/1 var(--font-body)' }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2.5px solid var(--border-strong)', borderTopColor: 'var(--green-500)', animation: 'pv-spin .8s linear infinite' }} />
          Загружаем ещё…
        </div>
      )}
    </section>
  );
}
