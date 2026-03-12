import { useState } from 'react';
import Icon from '@/components/ui/icon';

type TicketType = 'bug' | 'shop' | 'ban' | 'griefer' | 'other';
type TicketServer = 'chernarus' | 'sakhal' | 'both' | 'general';

interface Ticket {
  id: string;
  type: string;
  subject: string;
  server: string;
  status: 'open' | 'in_progress' | 'closed';
  date: string;
  lastReply: string;
}

const MOCK_TICKETS: Ticket[] = [
  { id: 'TK-2841', type: 'Нарушитель', subject: 'Игрок уничтожил мои ворота', server: 'Chernarus', status: 'in_progress', date: '10.03.2026', lastReply: '10.03.2026 14:35' },
  { id: 'TK-2799', type: 'Магазин', subject: 'Не получил купленный VIP', server: 'Sakhal', status: 'closed', date: '07.03.2026', lastReply: '07.03.2026 19:10' },
];

const TICKET_TYPES: { id: TicketType; label: string; icon: string; desc: string }[] = [
  { id: 'bug', label: 'Баг / Ошибка', icon: 'Bug', desc: 'Технические проблемы, вылеты' },
  { id: 'shop', label: 'Проблема с магазином', icon: 'ShoppingCart', desc: 'Не выдан товар, ошибка оплаты' },
  { id: 'ban', label: 'Апелляция бана', icon: 'Ban', desc: 'Оспорить блокировку аккаунта' },
  { id: 'griefer', label: 'Жалоба на игрока', icon: 'AlertTriangle', desc: 'Нарушитель, гриферство, читы' },
  { id: 'other', label: 'Другое', icon: 'MessageSquare', desc: 'Прочие вопросы' },
];

const STATUS_STYLE: Record<Ticket['status'], { color: string; label: string; bg: string }> = {
  open: { color: '#4ade80', label: 'Открыт', bg: 'rgba(74, 222, 128, 0.1)' },
  in_progress: { color: '#eab308', label: 'В работе', bg: 'rgba(234, 179, 8, 0.1)' },
  closed: { color: 'rgba(180, 210, 180, 0.4)', label: 'Закрыт', bg: 'rgba(180, 210, 180, 0.05)' },
};

export default function SupportPage() {
  const [tab, setTab] = useState<'new' | 'list'>('new');
  const [selectedType, setSelectedType] = useState<TicketType | null>(null);
  const [selectedServer, setSelectedServer] = useState<TicketServer>('chernarus');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedType || !subject || !message) return;
    setSubmitted(true);
  };

  const SERVERS: { id: TicketServer; label: string }[] = [
    { id: 'chernarus', label: 'Chernarus' },
    { id: 'sakhal', label: 'Sakhal (HARD)' },
    { id: 'both', label: 'Оба сервера' },
    { id: 'general', label: 'Общий вопрос' },
  ];

  return (
    <div className="min-h-screen biohazard-bg grid-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// SUPPORT</span>
          <h1 className="font-heading font-black text-4xl tracking-widest mt-1" style={{
            color: '#4ade80',
            textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          }}>ТЕХ. ПОДДЕРЖКА</h1>
          <p className="text-sm mt-2" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>
            Среднее время ответа: 2–6 часов
          </p>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://discord.gg/ySvP9Z8QGP"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-sm transition-all group"
            style={{
              background: 'rgba(88, 101, 242, 0.06)',
              border: '1px solid rgba(88, 101, 242, 0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88, 101, 242, 0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88, 101, 242, 0.25)';
            }}
          >
            <div className="text-3xl">💬</div>
            <div>
              <div className="font-heading font-bold tracking-wider" style={{ color: '#7289da' }}>Discord</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(200, 200, 255, 0.5)' }}>Быстрый ответ в #поддержка</div>
            </div>
            <Icon name="ExternalLink" size={14} className="ml-auto" style={{ color: 'rgba(88, 101, 242, 0.4)' } as React.CSSProperties} />
          </a>
          <a
            href="https://vk.com/globalviruspve"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-sm transition-all"
            style={{
              background: 'rgba(0, 119, 255, 0.06)',
              border: '1px solid rgba(0, 119, 255, 0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 119, 255, 0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 119, 255, 0.25)';
            }}
          >
            <div className="text-3xl">🌐</div>
            <div>
              <div className="font-heading font-bold tracking-wider" style={{ color: '#4a90d9' }}>ВКонтакте</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(200, 220, 255, 0.5)' }}>Сообщения сообщества</div>
            </div>
            <Icon name="ExternalLink" size={14} className="ml-auto" style={{ color: 'rgba(0, 119, 255, 0.4)' } as React.CSSProperties} />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-sm" style={{
          background: 'rgba(13, 26, 13, 0.8)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          {[
            { id: 'new', label: 'Новый тикет', icon: 'Plus' },
            { id: 'list', label: 'Мои тикеты', icon: 'List' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as 'new' | 'list')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm transition-all"
              style={{
                background: tab === t.id ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                color: tab === t.id ? '#4ade80' : 'rgba(180, 210, 180, 0.5)',
                fontFamily: 'Oswald',
                letterSpacing: '0.1em',
                fontSize: '0.85rem',
              }}
            >
              <Icon name={t.icon} size={14} />
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* New ticket */}
        {tab === 'new' && !submitted && (
          <div className="space-y-5">
            {/* Type selection */}
            <div className="p-5 rounded-sm" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
              <div className="font-mono text-xs mb-4" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// ТИП ОБРАЩЕНИЯ</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {TICKET_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="flex items-center gap-3 p-3 rounded-sm text-left transition-all"
                    style={{
                      background: selectedType === type.id ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.03)',
                      border: `1px solid ${selectedType === type.id ? 'rgba(74, 222, 128, 0.4)' : 'rgba(74, 222, 128, 0.1)'}`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{
                      background: selectedType === type.id ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.05)',
                    }}>
                      <Icon name={type.icon} size={14} style={{ color: selectedType === type.id ? '#4ade80' : 'rgba(74, 222, 128, 0.4)' } as React.CSSProperties} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: selectedType === type.id ? '#e8f5e9' : 'rgba(180, 210, 180, 0.7)' }}>
                        {type.label}
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(180, 210, 180, 0.4)' }}>{type.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Server */}
            <div className="p-5 rounded-sm" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
              <div className="font-mono text-xs mb-4" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// СЕРВЕР</div>
              <div className="flex flex-wrap gap-2">
                {SERVERS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServer(s.id)}
                    className="px-4 py-1.5 rounded-sm text-xs font-mono transition-all"
                    style={{
                      background: selectedServer === s.id ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                      border: `1px solid ${selectedServer === s.id ? 'rgba(74, 222, 128, 0.5)' : 'rgba(74, 222, 128, 0.2)'}`,
                      color: selectedServer === s.id ? '#4ade80' : 'rgba(180, 210, 180, 0.6)',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="p-5 rounded-sm space-y-4" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
              <div className="font-mono text-xs mb-2" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// ДЕТАЛИ</div>
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(74, 222, 128, 0.6)' }}>
                  ТЕМА ОБРАЩЕНИЯ
                </label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Кратко опишите проблему..."
                  className="w-full px-3 py-2.5 rounded-sm text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(74, 222, 128, 0.05)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    color: '#e8f5e9',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(74, 222, 128, 0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(74, 222, 128, 0.2)')}
                />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(74, 222, 128, 0.6)' }}>
                  ОПИСАНИЕ
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Подробно опишите ситуацию. Укажи ник в игре, время события, скриншоты..."
                  className="w-full px-3 py-2.5 rounded-sm text-sm outline-none resize-none transition-all"
                  style={{
                    background: 'rgba(74, 222, 128, 0.05)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    color: '#e8f5e9',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(74, 222, 128, 0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(74, 222, 128, 0.2)')}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>
                  // Требуется авторизация через Steam
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedType || !subject || !message}
                  className="virus-btn px-6 py-2.5 rounded-sm text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="Send" size={14} />
                    Отправить тикет
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submitted */}
        {tab === 'new' && submitted && (
          <div className="text-center py-16 p-8 rounded-sm" style={{
            background: 'rgba(13, 26, 13, 0.8)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
          }}>
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-heading font-bold text-2xl tracking-wider mb-2" style={{ color: '#4ade80' }}>
              ТИКЕТ СОЗДАН
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(180, 210, 180, 0.7)' }}>
              Мы ответим в течение 2–6 часов. Следи за статусом в разделе "Мои тикеты".
            </p>
            <button onClick={() => { setSubmitted(false); setSelectedType(null); setSubject(''); setMessage(''); setTab('list'); }}
              className="virus-btn-outline px-6 py-2 rounded-sm text-sm">
              Мои тикеты
            </button>
          </div>
        )}

        {/* Ticket list */}
        {tab === 'list' && (
          <div>
            {MOCK_TICKETS.length === 0 ? (
              <div className="text-center py-16" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>
                <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-mono text-sm">// Нет обращений</p>
              </div>
            ) : (
              <div className="space-y-3">
                {MOCK_TICKETS.map(ticket => {
                  const st = STATUS_STYLE[ticket.status];
                  return (
                    <div key={ticket.id} className="p-4 rounded-sm cursor-pointer transition-all" style={{
                      background: 'rgba(13, 26, 13, 0.8)',
                      border: '1px solid rgba(74, 222, 128, 0.12)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.25)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.12)';
                    }}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-xs mt-1" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>
                            {ticket.id}
                          </span>
                          <div>
                            <div className="font-medium text-sm mb-1" style={{ color: '#e8f5e9' }}>{ticket.subject}</div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="tag">{ticket.type}</span>
                              <span className="tag">{ticket.server}</span>
                              <span className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>
                                {ticket.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono" style={{ color: 'rgba(180, 210, 180, 0.4)' }}>
                            {ticket.lastReply}
                          </span>
                          <span className="px-2 py-0.5 rounded-sm text-xs font-mono" style={{
                            background: st.bg,
                            color: st.color,
                            border: `1px solid ${st.color}44`,
                          }}>
                            {st.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-xs font-mono mt-6 text-center" style={{ color: 'rgba(74, 222, 128, 0.3)' }}>
              // История тикетов доступна после авторизации через Steam
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
