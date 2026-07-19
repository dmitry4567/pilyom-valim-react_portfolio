const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.2 1.29-1.97 1.4-.5.07-1.15.13-3.32-.72-2.79-1.1-4.58-3.94-4.72-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.24-.26.53-.32.71-.32h.5c.16.01.38-.06.59.45.24.55.81 1.9.88 2.04.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
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

const IconPhone = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.36 2.07.7 3.06a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.02-1.27a2 2 0 0 1 2.11-.45c.99.34 2.01.57 3.06.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)' }}>
      <div className="pv-wrap pv-pad" style={{ padding: 'clamp(40px,6vw,56px) 20px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div>
            <div style={{ font: '800 18px/1 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: '#fff' }}>Пилим Валим</div>
            <div style={{ font: '500 13px/1.4 var(--font-body)', color: 'var(--neutral-300)', marginTop: 3 }}>Спил и удаление деревьев · Ростов-на-Дону и Ростовская область</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a className="pv-cta pv-cta--primary" href="https://wa.me/79515103366" target="_blank" rel="noopener">
            <IconWhatsApp />WhatsApp
          </a>
          <a className="pv-cta" href="tel:+79515103366">
            <IconPhone />+7 951 510-33-66
          </a>
          <a className="pv-cta" href="https://max.ru/u/f9LHodD0cOJzutV78i3x9NKIjlZllSjRd79CRyMBA2Q4rZLc2IuuyorMPdw" target="_blank" rel="noopener">
            <IconMax />MAX
          </a>
          <a className="pv-cta" href="https://instagram.com/arborist_rnd" target="_blank" rel="noopener">
            <IconInstagram />@arborist_rnd
          </a>
        </div>

        <div style={{ font: '400 12.5px/1.5 var(--font-body)', color: 'var(--neutral-400)', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 18 }}>
          2026 Пилим Валим. Работаем с организациями и физическими лицами.
        </div>
      </div>
    </footer>
  );
}
