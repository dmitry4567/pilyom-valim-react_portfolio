import { useState, useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { dbGet, dbPut, dbPut2, tilesGetAll } from './hooks/useIndexedDB';

const ENERGY_MAP = {
  calm:     { scale: '1.02', lift: '-1px',  rot: '0deg',    pulse: '4.2s' },
  balanced: { scale: '1.05', lift: '-3px',  rot: '0deg',    pulse: '2.4s' },
  wild:     { scale: '1.12', lift: '-6px',  rot: '-1.5deg', pulse: '1.1s' },
};

export default function App() {
  const [heroVariant] = useState('center');
  const [mood] = useState('dusk');
  const [energy] = useState('balanced');
  const [feedLayout] = useState('mosaic');

  const [showTop, setShowTop] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [tileMedia, setTileMedia] = useState({});
  const [serviceMedia, setServiceMedia] = useState({});

  const fileRef = useRef(null);
  const tileFileRef = useRef(null);
  const serviceFileRef = useRef(null);
  const activeTileRef = useRef(null);
  const activeServiceRef = useRef(null);

  const em = ENERGY_MAP[energy] || ENERGY_MAP.balanced;

  useEffect(() => {
    dbGet('video').then(blob => {
      if (blob) setVideoUrl(URL.createObjectURL(blob));
    }).catch(() => {});

    tilesGetAll().then(map => {
      const tMedia = {}, sMedia = {};
      Object.keys(map).forEach(k => {
        const rec = map[k];
        if (!rec || !rec.blob) return;
        const entry = { kind: rec.kind, url: URL.createObjectURL(rec.blob) };
        if (k.startsWith('svc:')) sMedia[k.slice(4)] = entry;
        else if (k.startsWith('tile:')) tMedia[Number(k.slice(5))] = entry;
      });
      if (Object.keys(tMedia).length) setTileMedia(tMedia);
      if (Object.keys(sMedia).length) setServiceMedia(sMedia);
    }).catch(() => {});

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setShowTop(y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (videoUrl) { try { URL.revokeObjectURL(videoUrl); } catch (e) {} }
    };
  }, [videoUrl]);

  const onHeroClick = (e) => {
    if (e.target.closest('[data-no-hero-click]')) return;
    fileRef.current && fileRef.current.click();
  };

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (videoUrl) { try { URL.revokeObjectURL(videoUrl); } catch (err) {} }
    const url = URL.createObjectURL(f);
    setVideoUrl(url);
    dbPut('video', f).catch(() => {});
  };

  const openTilePicker = (id) => {
    activeTileRef.current = id;
    if (tileFileRef.current) { tileFileRef.current.value = ''; tileFileRef.current.click(); }
  };

  const onTileFile = (e) => {
    const f = e.target.files && e.target.files[0];
    const id = activeTileRef.current;
    if (!f || id == null) return;
    const kind = f.type.startsWith('video') ? 'video' : 'image';
    setTileMedia(prev => {
      const old = prev[id];
      if (old && old.url) { try { URL.revokeObjectURL(old.url); } catch (err) {} }
      return { ...prev, [id]: { kind, url: URL.createObjectURL(f) } };
    });
    dbPut2('tiles', 'tile:' + id, { blob: f, kind }).catch(() => {});
  };

  const openServicePicker = (key) => {
    activeServiceRef.current = key;
    if (serviceFileRef.current) { serviceFileRef.current.value = ''; serviceFileRef.current.click(); }
  };

  const onServiceFile = (e) => {
    const f = e.target.files && e.target.files[0];
    const key = activeServiceRef.current;
    if (!f || !key) return;
    const kind = f.type.startsWith('video') ? 'video' : 'image';
    setServiceMedia(prev => {
      const old = prev[key];
      if (old && old.url) { try { URL.revokeObjectURL(old.url); } catch (err) {} }
      return { ...prev, [key]: { kind, url: URL.createObjectURL(f) } };
    });
    dbPut2('tiles', 'svc:' + key, { blob: f, kind }).catch(() => {});
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      style={{
        background: 'var(--surface-page)',
        '--pulse-dur': em.pulse,
        '--pulse-play': 'running',
        '--tile-hover-scale': em.scale,
        '--tile-hover-lift': em.lift,
        '--tile-hover-rot': em.rot,
      }}
    >
      <HeroSection
        heroVariant={heroVariant}
        mood={mood}
        energy={energy}
        leafCount={26}
        fallingLeaves={true}
        videoUrl={videoUrl}
        onHeroClick={onHeroClick}
        onFile={onFile}
        fileRef={fileRef}
      />
      <AboutSection />
      <ServicesSection
        serviceMedia={serviceMedia}
        serviceFileRef={serviceFileRef}
        onServiceFile={onServiceFile}
        openServicePicker={openServicePicker}
      />
      <GallerySection
        tileMedia={tileMedia}
        tileFileRef={tileFileRef}
        onTileFile={onTileFile}
        openTilePicker={openTilePicker}
        feedLayout={feedLayout}
        showTileLabel={false}
        showTileAddButton={false}
      />
      <Footer />

      {showTop && (
        <button type="button" className="pv-top" aria-label="Наверх" onClick={scrollTop}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
