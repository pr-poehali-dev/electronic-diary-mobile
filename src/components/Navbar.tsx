import { useState } from 'react';
import Icon from '@/components/ui/icon';
import useClickSound from '@/hooks/use-click-sound';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'shop', label: 'Магазин' },
  { id: 'rules', label: 'Правила и гайды' },
  { id: 'support', label: 'Тех. поддержка' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const playClick = useClickSound();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(6, 10, 6, 0.95)',
      borderBottom: '1px solid rgba(74, 222, 128, 0.15)',
      backdropFilter: 'blur(10px)',
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => { playClick(); onNavigate('home'); }} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #16a34a, #0a0f0a)',
                border: '1px solid rgba(74, 222, 128, 0.5)',
                boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)',
              }}>
                <span className="text-xs font-bold" style={{ color: '#4ade80', fontFamily: 'Share Tech Mono' }}>☣</span>
              </div>
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-base leading-none tracking-widest" style={{ color: '#4ade80', textShadow: '0 0 10px rgba(74, 222, 128, 0.4)' }}>
                GLOBAL VIRUS
              </div>
              <div className="text-xs leading-none mt-0.5" style={{ color: 'rgba(74, 222, 128, 0.5)', fontFamily: 'Share Tech Mono', letterSpacing: '0.1em' }}>
                DayZ PVE
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { playClick(); onNavigate(item.id); }}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => { playClick(); onNavigate('profile'); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all"
              style={{
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: '#4ade80',
                fontFamily: 'Oswald',
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(74, 222, 128, 0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.3)';
              }}
            >
              <Icon name="SteamIcon" fallback="LogIn" size={14} />
              Войти через Steam
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: '#4ade80' }}
            onClick={() => { playClick(); setMobileOpen(!mobileOpen); }}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'rgba(74, 222, 128, 0.1)', background: 'rgba(6, 10, 6, 0.98)' }}>
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { playClick(); onNavigate(item.id); setMobileOpen(false); }}
                className={`block w-full text-left py-2.5 nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { playClick(); onNavigate('profile'); setMobileOpen(false); }}
              className="block w-full text-left py-2.5 nav-link"
            >
              Войти через Steam
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}