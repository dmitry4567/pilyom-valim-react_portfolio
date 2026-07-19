import { useRef, useEffect } from 'react';

export function useVideoStream(videoRef, src, { rootMargin = '400px' } = {}) {
  const savedTimeRef = useRef(0);
  const clearingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearingRef.current = false;
          video.src = src;
          video.load();
          video.addEventListener('loadedmetadata', () => {
            video.currentTime = savedTimeRef.current;
            video.play().catch(() => {});
          }, { once: true });
        } else {
          savedTimeRef.current = video.currentTime;
          video.pause();
          clearingRef.current = true;
          video.src = '';
          video.load();
        }
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, src, rootMargin]);

  return clearingRef;
}
