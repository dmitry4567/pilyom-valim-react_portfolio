import { useState, useEffect } from 'react';

const R2 = 'https://pub-135c9a6fdb7a48b0add9f1193570317a.r2.dev/gallery';

const VIDEOS = [
  'WhatsApp Video 2026-07-11 at 17.42.58.mp4',
  'WhatsApp Video 2026-07-11 at 17.45.21.mp4',
  'WhatsApp Video 2026-07-11 at 17.45.24.mp4',
  'WhatsApp Video 2026-07-11 at 17.48.02.mp4',
  'WhatsApp Video 2026-07-11 at 17.48.03 (1).mp4',
  'WhatsApp Video 2026-07-11 at 17.48.03.mp4',
  'WhatsApp Video 2026-07-11 at 17.52.24.mp4',
  'WhatsApp Video 2026-07-11 at 18.14.46.mp4',
  'WhatsApp Video 2026-07-11 at 18.16.17.mp4',
  'WhatsApp Video 2026-07-11 at 18.25.49.mp4',
  'WhatsApp Video 2026-07-11 at 18.29.29.mp4',
  'WhatsApp Video 2026-07-11 at 18.30.15.mp4',
  'WhatsApp Video 2026-07-11 at 18.30.50.mp4',
  'WhatsApp Video 2026-07-11 at 18.31.04.mp4',
  'WhatsApp Video 2026-07-11 at 18.32.49.mp4',
  'WhatsApp Video 2026-07-11 at 18.38.29.mp4',
  'WhatsApp Video 2026-07-11 at 18.39.16.mp4',
].map(name => `${R2}/${encodeURIComponent(name)}`);

const HEIGHTS = [240, 320, 200, 280, 360, 220, 300, 260];

function makeItems(start, n) {
  return Array.from({ length: n }, (_, i) => {
    const id = start + i;
    return {
      id,
      h: HEIGHTS[id % HEIGHTS.length],
      url: VIDEOS[id % VIDEOS.length],
    };
  });
}

export function useGallery(sentinelRef) {
  const [feed, setFeed] = useState(() => makeItems(0, 12));

  const addMore = () => {
    setFeed(prev => {
      if (prev.length >= 51) return prev;
      return prev.concat(makeItems(prev.length, 8));
    });
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) addMore(); }); },
      { rootMargin: '700px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sentinelRef, feed.length]);

  return { feed, canLoadMore: feed.length < 51 };
}
