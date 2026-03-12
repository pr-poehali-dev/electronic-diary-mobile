interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{
      background: 'rgba(6, 10, 6, 0.98)',
      borderTop: '1px solid rgba(74, 222, 128, 0.1)',
    }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-heading font-black text-xl tracking-widest mb-2" style={{ color: '#4ade80', textShadow: '0 0 10px rgba(74, 222, 128, 0.3)' }}>
              ☣ GLOBAL VIRUS
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(180, 210, 180, 0.5)' }}>
              DayZ PVE проект v1.28<br />
              Два сервера. Одно сообщество.
            </p>
            <div className="flex gap-3">
              <a href="https://discord.gg/ySvP9Z8QGP" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono px-2 py-1 rounded-sm transition-all"
                style={{ color: '#7289da', border: '1px solid rgba(88, 101, 242, 0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(88, 101, 242, 0.6)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(88, 101, 242, 0.3)')}
              >Discord</a>
              <a href="https://vk.com/globalviruspve" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono px-2 py-1 rounded-sm transition-all"
                style={{ color: '#4a90d9', border: '1px solid rgba(0, 119, 255, 0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0, 119, 255, 0.6)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0, 119, 255, 0.3)')}
              >ВКонтакте</a>
            </div>
          </div>

          {/* Servers */}
          <div>
            <div className="font-mono text-xs mb-4" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// СЕРВЕРЫ</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-heading font-bold tracking-wider mb-0.5" style={{ color: '#e8f5e9' }}>
                  GLOBAL VIRUS [PVE] #chernarus
                </div>
                <div className="font-mono text-xs" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>212.22.92.25:2332</div>
              </div>
              <div>
                <div className="text-xs font-heading font-bold tracking-wider mb-0.5" style={{ color: '#e8f5e9' }}>
                  GLOBAL VIRUS HARD [PVE]
                </div>
                <div className="font-mono text-xs" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>90.150.90.190:2303 — Sakhal</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-xs mb-4" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'shop', label: 'Магазин' },
                { id: 'rules', label: 'Правила и гайды' },
                { id: 'support', label: 'Тех. поддержка' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="block text-xs transition-all"
                  style={{ color: 'rgba(180, 210, 180, 0.5)', fontFamily: 'Roboto' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4ade80')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180, 210, 180, 0.5)')}
                >
                  → {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{
          borderTop: '1px solid rgba(74, 222, 128, 0.08)',
        }}>
          <p className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.25)' }}>
            © 2026 GLOBAL VIRUS PROJECT — DayZ Standalone 1.28
          </p>
          <p className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.25)' }}>
            Неофициальный фан-сайт. Не связан с Bohemia Interactive.
          </p>
        </div>
      </div>
    </footer>
  );
}
