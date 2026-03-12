import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface ServerInfo {
  name: string;
  map: string;
  ip: string;
  port: number;
  online: boolean;
  players: number;
  maxPlayers: number;
  tag: string;
}

const SERVERS: ServerInfo[] = [
  {
    name: 'GLOBAL VIRUS [PVE] #chernarus',
    map: 'Chernarus',
    ip: '212.22.92.25',
    port: 2332,
    online: true,
    players: 0,
    maxPlayers: 40,
    tag: 'PVE • VANILLA+',
  },
  {
    name: 'GLOBAL VIRUS HARD [PVE]',
    map: 'Sakhal',
    ip: '90.150.90.190',
    port: 2303,
    online: true,
    players: 0,
    maxPlayers: 40,
    tag: 'HARD • PVE',
  },
];

function ServerCard({ server }: { server: ServerInfo }) {
  const [players, setPlayers] = useState(server.players);
  const [online, setOnline] = useState(server.online);

  useEffect(() => {
    const mock = Math.floor(Math.random() * 25) + 3;
    setPlayers(mock);
    setOnline(true);
  }, []);

  const fillPercent = (players / server.maxPlayers) * 100;

  return (
    <div className="cyber-border rounded-sm p-6 relative overflow-hidden group" style={{
      background: 'linear-gradient(135deg, rgba(13, 26, 13, 0.95), rgba(6, 10, 6, 0.98))',
      transition: 'all 0.3s',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.15)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    }}
    >
      {/* Map badge */}
      <div className="absolute top-0 right-0 px-3 py-1 text-xs font-mono" style={{
        background: 'rgba(74, 222, 128, 0.1)',
        borderLeft: '1px solid rgba(74, 222, 128, 0.3)',
        borderBottom: '1px solid rgba(74, 222, 128, 0.3)',
        color: '#4ade80',
        letterSpacing: '0.1em',
      }}>
        {server.map.toUpperCase()}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`status-dot ${online ? 'online' : 'offline'}`} />
        <span className={`text-xs font-mono ${online ? 'server-online' : 'server-offline'}`}>
          {online ? '// ONLINE' : '// OFFLINE'}
        </span>
        <span className="tag ml-2">{server.tag}</span>
      </div>

      {/* Name */}
      <h3 className="font-heading font-bold text-xl mb-4 leading-tight" style={{
        color: '#e8f5e9',
        letterSpacing: '0.03em',
      }}>
        {server.name}
      </h3>

      {/* Players */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.6)' }}>PLAYERS</span>
          <span className="font-mono text-sm font-bold" style={{ color: '#4ade80' }}>
            {players} / {server.maxPlayers}
          </span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: '4px', background: 'rgba(74, 222, 128, 0.1)' }}>
          <div className="h-full rounded-full transition-all duration-1000" style={{
            width: `${fillPercent}%`,
            background: 'linear-gradient(90deg, #16a34a, #4ade80)',
            boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)',
          }} />
        </div>
      </div>

      {/* IP */}
      <div className="flex items-center gap-2 mb-5 p-2 rounded-sm" style={{
        background: 'rgba(74, 222, 128, 0.05)',
        border: '1px solid rgba(74, 222, 128, 0.1)',
      }}>
        <Icon name="Server" size={12} className="shrink-0" style={{ color: 'rgba(74, 222, 128, 0.5)' } as React.CSSProperties} />
        <span className="font-mono text-xs" style={{ color: 'rgba(74, 222, 128, 0.7)' }}>
          {server.ip}:{server.port}
        </span>
      </div>

      {/* Connect button */}
      <a
        href={`steam://connect/${server.ip}:${server.port}`}
        className="virus-btn block text-center py-2.5 px-4 rounded-sm text-sm"
      >
        <span className="flex items-center justify-center gap-2">
          <Icon name="Play" size={14} />
          Подключиться
        </span>
      </a>
    </div>
  );
}

export default function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen biohazard-bg grid-bg">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #16a34a, transparent 70%)' }} />
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full opacity-5"
            style={{ background: 'radial-gradient(ellipse, #4ade80, transparent)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Biohazard icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-7xl animate-flicker select-none" style={{ filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.6))' }}>
                ☣
              </div>
              <div className="absolute inset-0 text-7xl animate-flicker select-none opacity-30 blur-sm" style={{ color: '#4ade80' }}>
                ☣
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-2">
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>
              // DAYZ STANDALONE SERVER PROJECT
            </span>
          </div>
          <h1 className="font-heading font-black mb-3 leading-none tracking-widest"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#4ade80',
              textShadow: '0 0 30px rgba(74, 222, 128, 0.5), 0 0 60px rgba(74, 222, 128, 0.2)',
            }}>
            GLOBAL VIRUS
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.5))' }} />
            <span className="font-mono text-sm tracking-[0.2em]" style={{ color: 'rgba(74, 222, 128, 0.7)' }}>
              PVE SURVIVAL PROJECT 1.28
            </span>
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, rgba(74, 222, 128, 0.5), transparent)' }} />
          </div>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(200, 230, 200, 0.7)' }}>
            Два сервера — одно сообщество. Выживай на Чернарусе и Сахале.
            <br />
            Без griefing, только кооператив против зомби-апокалипсиса.
          </p>

          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-sm" style={{
            border: '1px solid rgba(74, 222, 128, 0.2)',
            background: 'rgba(74, 222, 128, 0.05)',
          }}>
            <span className="status-dot online" />
            <span className="font-mono text-xs" style={{ color: 'rgba(74, 222, 128, 0.8)' }}>
              LIVE STATUS{tick % 2 === 0 ? ' _' : '  '}
            </span>
          </div>

          {/* Server cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {SERVERS.map((server) => (
              <ServerCard key={server.ip} server={server} />
            ))}
          </div>
        </div>
      </section>

      {/* Community block */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// COMMUNITY</span>
            <h2 className="font-heading font-bold text-3xl mt-2 tracking-wider" style={{ color: '#e8f5e9' }}>
              ПРИСОЕДИНЯЙСЯ К НАМ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Discord */}
            <a
              href="https://discord.gg/ySvP9Z8QGP"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-6 rounded-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1), rgba(88, 101, 242, 0.05))',
                border: '1px solid rgba(88, 101, 242, 0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88, 101, 242, 0.7)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(88, 101, 242, 0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88, 101, 242, 0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">💬</div>
              <div className="text-center">
                <div className="font-heading font-bold text-lg tracking-wider" style={{ color: '#7289da' }}>Discord</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(200, 200, 255, 0.6)' }}>Общение, ивенты, анонсы</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'rgba(88, 101, 242, 0.7)' }}>
                <span>Вступить</span>
                <Icon name="ExternalLink" size={10} />
              </div>
            </a>

            {/* VK */}
            <a
              href="https://vk.com/globalviruspve"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-6 rounded-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 119, 255, 0.1), rgba(0, 119, 255, 0.05))',
                border: '1px solid rgba(0, 119, 255, 0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 119, 255, 0.7)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 119, 255, 0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 119, 255, 0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">🌐</div>
              <div className="text-center">
                <div className="font-heading font-bold text-lg tracking-wider" style={{ color: '#4a90d9' }}>ВКонтакте</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(200, 220, 255, 0.6)' }}>Новости и обновления</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'rgba(0, 119, 255, 0.7)' }}>
                <span>Подписаться</span>
                <Icon name="ExternalLink" size={10} />
              </div>
            </a>

            {/* WARGM */}
            <a
              href="https://wargm.ru/server/76283"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-6 rounded-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(234, 179, 8, 0.05))',
                border: '1px solid rgba(234, 179, 8, 0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(234, 179, 8, 0.7)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(234, 179, 8, 0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(234, 179, 8, 0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">⭐</div>
              <div className="text-center">
                <div className="font-heading font-bold text-lg tracking-wider" style={{ color: '#eab308' }}>WARGM</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255, 240, 150, 0.6)' }}>Голосуй каждый день!</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'rgba(234, 179, 8, 0.7)' }}>
                <span>Проголосовать</span>
                <Icon name="ExternalLink" size={10} />
              </div>
            </a>
          </div>

          {/* Vote reminder */}
          <div className="mt-8 max-w-2xl mx-auto text-center p-4 rounded-sm" style={{
            border: '1px dashed rgba(234, 179, 8, 0.3)',
            background: 'rgba(234, 179, 8, 0.03)',
          }}>
            <p className="text-sm font-mono" style={{ color: 'rgba(234, 179, 8, 0.7)' }}>
              ⚠ Голосование на WARGM доступно каждые 12 часов. Помогай серверу расти!
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// PROJECT INFO</span>
            <h2 className="font-heading font-bold text-3xl mt-2 tracking-wider" style={{ color: '#e8f5e9' }}>
              О ПРОЕКТЕ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'Shield', title: 'PVE Формат', desc: 'Только кооперативное выживание. Без KOS. Никто не нападёт на тебя без причины.', color: '#4ade80' },
              { icon: 'Map', title: '2 Карты', desc: 'Chernarus — классика DayZ. Sakhal — новый остров с суровыми условиями.', color: '#4ade80' },
              { icon: 'Users', title: 'Сообщество', desc: 'Активный Discord и ВКонтакте. Ивенты, конкурсы, помощь новичкам.', color: '#4ade80' },
              { icon: 'Package', title: 'Магазин', desc: 'Поддержи проект — получи уникальные предметы и привилегии на сервере.', color: '#4ade80' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-sm" style={{
                background: 'rgba(13, 26, 13, 0.6)',
                border: '1px solid rgba(74, 222, 128, 0.1)',
              }}>
                <div className="mb-3 w-10 h-10 rounded-sm flex items-center justify-center" style={{
                  background: 'rgba(74, 222, 128, 0.1)',
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                }}>
                  <Icon name={item.icon} size={18} style={{ color: item.color } as React.CSSProperties} />
                </div>
                <h3 className="font-heading font-bold text-base tracking-wider mb-2" style={{ color: '#e8f5e9' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(180, 210, 180, 0.7)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="py-12" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.08)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('shop')} className="virus-btn px-8 py-3 rounded-sm text-sm">
              <span className="flex items-center gap-2 justify-center">
                <Icon name="ShoppingCart" size={16} />
                Открыть магазин
              </span>
            </button>
            <button onClick={() => onNavigate('rules')} className="virus-btn-outline px-8 py-3 rounded-sm text-sm">
              <span className="flex items-center gap-2 justify-center">
                <Icon name="BookOpen" size={16} />
                Правила и гайды
              </span>
            </button>
            <button onClick={() => onNavigate('support')} className="virus-btn-outline px-8 py-3 rounded-sm text-sm">
              <span className="flex items-center gap-2 justify-center">
                <Icon name="HelpCircle" size={16} />
                Поддержка
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
