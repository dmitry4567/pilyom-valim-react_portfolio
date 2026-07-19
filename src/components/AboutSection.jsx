export default function AboutSection() {
  return (
    <section className="pv-wrap pv-pad" style={{ padding: 'clamp(48px,8vw,80px) 20px' }}>
      <div className="pv-about" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="pv-about-h">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: '700 12px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--green-600)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)', boxShadow: 'var(--glow-md)' }} />
            О работе
          </span>
          <h2 style={{ font: '800 clamp(27px,4.6vw,42px)/1.04 var(--font-display)', letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)', margin: '14px 0 0', textWrap: 'balance' }}>
            Сложные задачи — в кратчайшие сроки
          </h2>
        </div>
        <p className="pv-about-p" style={{ font: '400 clamp(15px,2.1vw,18px)/1.62 var(--font-body)', color: 'var(--text-body)', margin: 0 }}>
          Принимаем заказы по обрезке и спилу деревьев любой сложности. Работы выполняются методом верёвочного доступа, с использованием альпинистского снаряжения. Наша команда готова к выполнению самых сложных задач в кратчайшие сроки. Парк техники позволяет предложить вам максимально широкий спектр услуг: переработка веток в щепу и фрезеровка (удаление) пней, а также вывоз деревьев. Работаем с организациями и физическими лицами.
          <br /><br />
          <span style={{ color: 'var(--green-600)', fontWeight: 600 }}>Ростов-на-Дону и Ростовская область.</span>
        </p>
      </div>
    </section>
  );
}
