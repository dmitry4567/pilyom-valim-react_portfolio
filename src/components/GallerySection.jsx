import { useRef, useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useVideoStream } from '../hooks/useVideoStream';

const IconPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" /><path d="M5 12h14" />
  </svg>
);

function StreamingVideo({ src, style, onError }) {
  const ref = useRef(null);
  const clearingRef = useVideoStream(ref, src);
  return <video ref={ref} muted loop playsInline poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230c1a10' width='1' height='1'/%3E%3C/svg%3E" style={style} onError={() => { if (!clearingRef.current) onError?.(); }} />;
}

function GalleryTile({ item, tileMedia, feedLayout, showTileLabel, showTileAddButton, onAdd, imgErr }) {
  const [errored, setErrored] = useState(false);
  const user = tileMedia[item.id];
  const userIsVideo = !!(user && user.kind === 'video');
  const userIsImage = !!(user && user.kind === 'image');
  const showDemo = !user;

  if (errored) return null;
  const h = feedLayout === 'grid' ? 240 : item.h;
  const kindLabel = user ? (userIsVideo ? 'Ваше видео' : 'Ваше фото') : 'Видео';
  const addLabel = user ? 'Заменить' : 'Добавить';

  return (
    <div className="pv-tile" style={{ background: '#0c1a10', height: h }} onClick={() => onAdd(item.id)}>
      {userIsVideo && (
        <StreamingVideo src={user.url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {userIsImage && (
        <img src={user.url} alt="Ваше фото" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {showDemo && (
        <StreamingVideo src={item.url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={() => setErrored(true)} />
      )}
      {showTileLabel && (
        <span style={{ position: 'absolute', top: 10, left: 10, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 999, background: 'rgba(12,20,14,.62)', backdropFilter: 'blur(6px)', color: '#fff', font: '600 11px/1 var(--font-body)' }}>
          {kindLabel}
        </span>
      )}
      {showTileAddButton && (
        <span style={{ position: 'absolute', bottom: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: 'var(--color-primary)', color: '#fff', font: '700 11px/1 var(--font-body)', boxShadow: 'var(--glow-md)', pointerEvents: 'none' }}>
          <IconPlus />{addLabel}
        </span>
      )}
    </div>
  );
}

export default function GallerySection({ tileMedia, tileFileRef, onTileFile, openTilePicker, feedLayout, showTileLabel, showTileAddButton }) {
  const sentinelRef = useRef(null);
  const { feed, canLoadMore } = useGallery(sentinelRef);

  const imgErr = (e) => { if (e && e.target) e.target.style.opacity = 0; };
  const feedClass = feedLayout === 'grid' ? 'pv-feed-grid' : 'pv-feed';

  return (
    <section className="pv-wrap pv-pad" style={{ padding: 'clamp(48px,8vw,80px) 20px clamp(56px,9vw,96px)' }}>
      <input ref={tileFileRef} type="file" accept="image/*,video/*" onChange={onTileFile} style={{ display: 'none' }} />

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
          <GalleryTile
            key={item.id}
            item={item}
            tileMedia={tileMedia}
            feedLayout={feedLayout}
            showTileLabel={showTileLabel}
            showTileAddButton={showTileAddButton}
            onAdd={openTilePicker}
            imgErr={imgErr}
          />
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
