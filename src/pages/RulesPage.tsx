import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Tab = 'rules' | 'guides' | 'faq';

const RULES = [
  {
    num: '01',
    title: 'Запрет на убийство игроков (KOS)',
    content: 'Серверы работают в PVE формате. Убийство игроков без их согласия категорически запрещено. Исключение: PvP зоны, если они обозначены на карте. Нарушение = перманентный бан.',
    severity: 'critical',
  },
  {
    num: '02',
    title: 'Запрет на гриферство',
    content: 'Нельзя уничтожать базы, технику и имущество других игроков. Нельзя воровать из замкнутых хранилищ. Брошенное снаряжение — другое дело.',
    severity: 'critical',
  },
  {
    num: '03',
    title: 'Уважение к игрокам',
    content: 'Запрещены оскорбления, дискриминация, разжигание конфликтов в чате. Споры решаются через тех. поддержку, а не кулаками.',
    severity: 'high',
  },
  {
    num: '04',
    title: 'Читы и эксплойты',
    content: 'Использование любых чит-программ, дюпов, эксплойтов движка — немедленный перманентный бан без возможности апелляции.',
    severity: 'critical',
  },
  {
    num: '05',
    title: 'Базы и постройки',
    content: 'Максимальный размер базы — 30 объектов на одного игрока. Нельзя блокировать дороги, лутовые точки и военные объекты.',
    severity: 'medium',
  },
  {
    num: '06',
    title: 'Язык в чате',
    content: 'Основной язык общения — русский. Разрешается английский. Флуд, спам и реклама других серверов — мут на 24 часа.',
    severity: 'low',
  },
  {
    num: '07',
    title: 'Администрация',
    content: 'Решения администрации обязательны к исполнению. Споры с решениями подаются письменно в Discord. Устные споры в чате не рассматриваются.',
    severity: 'medium',
  },
  {
    num: '08',
    title: 'Магазин и донат',
    content: 'Донат не даёт преимуществ в PvP-взаимодействии. Администрация не несёт ответственность за ошибки при покупке, сделанные по вине игрока.',
    severity: 'low',
  },
];

const GUIDES = [
  {
    icon: '🗺️',
    title: 'Начало игры на Chernarus',
    category: 'Для новичков',
    content: [
      'Спавнишься на берегу моря — двигайся вглубь, избегай открытых полей',
      'Первые цели: найти еду, воду, одежду и аптечку',
      'Военные базы: НЕФТЬ (NE) — военный аэродром с хорошим лутом',
      'Безопасные зоны: крупные города — Электро, Черногорск, Северо',
      'Связывайся с игроками через внутриигровой чат /say',
    ],
  },
  {
    icon: '🏔️',
    title: 'Выживание на Sakhal',
    category: 'Для новичков',
    content: [
      'Sakhal — суровый остров со снегом и экстремальным холодом',
      'Температура критична! Носи зимнее снаряжение всегда',
      'Огонь — твой лучший друг. Всегда имей кремень и сталь',
      'Еды меньше, лут редкий — кооператив жизненно необходим',
      'Транспорт приоритетнее чем на Чернарусе из-за расстояний',
    ],
  },
  {
    icon: '🏠',
    title: 'Строительство базы',
    category: 'Механики',
    content: [
      'Выбирай место подальше от спавна и популярных маршрутов',
      'Начни с деревянного фундамента → стены → ворота',
      'Комбинируй стены и заборы для защиты периметра',
      'Замки: кодовый замок — самый надёжный, не забудь код!',
      'Максимум 30 объектов на игрока по правилам сервера',
    ],
  },
  {
    icon: '⚕️',
    title: 'Медицина и здоровье',
    category: 'Механики',
    content: [
      'Статусы: Здоровый, Больной, Ранен, Переломан, Без сознания',
      'Кровотечение — бинты и тряпки. Переломы — шины',
      'Еда и вода — следи постоянно, голод убивает медленно',
      'Дефибриллятор нужен для реанимации павших товарищей',
      'Антибиотики — при заражении. Ищи их в больницах',
    ],
  },
  {
    icon: '🔧',
    title: 'Как подключиться к серверу',
    category: 'Инструкции',
    content: [
      'Открой DayZ → Community → DayZ Launcher',
      'Поиск: вбей "GLOBAL VIRUS" или напрямую введи IP',
      'Chernarus: 212.22.92.25:2332',
      'Sakhal (HARD): 90.150.90.190:2303',
      'Если сервер не в списке — обновить DayZ Launcher',
    ],
  },
  {
    icon: '💰',
    title: 'Как использовать магазин',
    category: 'Инструкции',
    content: [
      'Войди на сайт через Steam (кнопка в шапке)',
      'Пополни баланс удобным способом оплаты',
      'Выбери товар и сервер, добавь в корзину',
      'После оплаты предмет выдаётся автоматически',
      'Войди на сервер в течение 24 часов для получения',
    ],
  },
];

const FAQ = [
  { q: 'Я умер, мои покупки пропали?', a: 'Купленные предметы из магазина выдаются однократно. При смерти они теряются как обычный лут. Перед покупкой обустрой безопасную точку.' },
  { q: 'Можно ли играть на обоих серверах с одного аккаунта?', a: 'Да, Steam аккаунт работает на обоих серверах. Профиль, баланс и история покупок единые.' },
  { q: 'Есть ли вайп серверов?', a: 'Вайп происходит при крупных обновлениях DayZ или по решению администрации. Анонс за 3 дня в Discord и ВКонтакте.' },
  { q: 'Как сообщить о нарушителе?', a: 'Создай тикет в тех. поддержке на этом сайте или напиши в Discord. Укажи ник нарушителя, время и скриншот/видео.' },
  { q: 'Возможен ли возврат доната?', a: 'Возврат рассматривается в течение 24 часов после покупки, если предмет не был получен. Обратись в тех. поддержку с номером заказа.' },
  { q: 'Что даёт VIP статус?', a: 'Приоритетный слот при заполненном сервере, цветное имя в чате, 10% скидка в магазине на весь период действия.' },
];

const severityColor: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: 'rgba(74, 222, 128, 0.6)',
};

const severityLabel: Record<string, string> = {
  critical: 'КРИТИЧНО',
  high: 'ВАЖНО',
  medium: 'СРЕДНЕЕ',
  low: 'ИНФО',
};

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rules');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openGuide, setOpenGuide] = useState<number | null>(null);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'rules', label: 'Правила', icon: 'Shield' },
    { id: 'guides', label: 'Гайды', icon: 'BookOpen' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
  ];

  return (
    <div className="min-h-screen biohazard-bg grid-bg pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// KNOWLEDGE BASE</span>
          <h1 className="font-heading font-black text-4xl tracking-widest mt-1" style={{
            color: '#4ade80',
            textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          }}>ПРАВИЛА И ГАЙДЫ</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-sm" style={{
          background: 'rgba(13, 26, 13, 0.8)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm transition-all"
              style={{
                background: activeTab === tab.id ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#4ade80' : 'rgba(180, 210, 180, 0.5)',
                boxShadow: activeTab === tab.id ? '0 0 10px rgba(74, 222, 128, 0.1)' : 'none',
                fontFamily: 'Oswald',
                letterSpacing: '0.1em',
                fontSize: '0.85rem',
              }}
            >
              <Icon name={tab.icon} size={14} />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-3">
            <div className="p-4 rounded-sm mb-6 flex gap-3" style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}>
              <Icon name="AlertTriangle" size={18} className="shrink-0 mt-0.5" style={{ color: '#ef4444' } as React.CSSProperties} />
              <p className="text-sm" style={{ color: 'rgba(255, 180, 180, 0.8)' }}>
                Незнание правил не освобождает от ответственности. За нарушения — мут, кик или бан в зависимости от тяжести.
              </p>
            </div>
            {RULES.map((rule) => (
              <div key={rule.num} className="p-5 rounded-sm" style={{
                background: 'rgba(13, 26, 13, 0.8)',
                border: `1px solid rgba(74, 222, 128, 0.12)`,
                borderLeft: `3px solid ${severityColor[rule.severity]}`,
              }}>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-2xl font-bold shrink-0" style={{ color: 'rgba(74, 222, 128, 0.2)' }}>
                    {rule.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-heading font-bold tracking-wide" style={{ color: '#e8f5e9' }}>
                        {rule.title}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-sm" style={{
                        color: severityColor[rule.severity],
                        border: `1px solid ${severityColor[rule.severity]}44`,
                        background: `${severityColor[rule.severity]}11`,
                      }}>
                        {severityLabel[rule.severity]}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(180, 210, 180, 0.7)' }}>
                      {rule.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guides */}
        {activeTab === 'guides' && (
          <div className="space-y-4">
            {GUIDES.map((guide, i) => (
              <div key={i} className="rounded-sm overflow-hidden" style={{
                border: `1px solid ${openGuide === i ? 'rgba(74, 222, 128, 0.3)' : 'rgba(74, 222, 128, 0.12)'}`,
                background: 'rgba(13, 26, 13, 0.8)',
              }}>
                <button
                  className="w-full flex items-center gap-4 p-5 text-left transition-all"
                  onClick={() => setOpenGuide(openGuide === i ? null : i)}
                  style={{ background: openGuide === i ? 'rgba(74, 222, 128, 0.05)' : 'transparent' }}
                >
                  <span className="text-3xl">{guide.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-heading font-bold tracking-wide" style={{ color: '#e8f5e9' }}>{guide.title}</h3>
                      <span className="tag">{guide.category}</span>
                    </div>
                  </div>
                  <Icon
                    name={openGuide === i ? 'ChevronUp' : 'ChevronDown'}
                    size={16}
                    style={{ color: 'rgba(74, 222, 128, 0.5)' } as React.CSSProperties}
                  />
                </button>
                {openGuide === i && (
                  <div className="px-5 pb-5 pt-0" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.1)' }}>
                    <ul className="space-y-2 mt-4">
                      {guide.content.map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(180, 210, 180, 0.8)' }}>
                          <span className="shrink-0 mt-0.5 font-mono text-xs" style={{ color: '#4ade80' }}>→</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-sm overflow-hidden" style={{
                border: `1px solid ${openFaq === i ? 'rgba(74, 222, 128, 0.3)' : 'rgba(74, 222, 128, 0.12)'}`,
                background: 'rgba(13, 26, 13, 0.8)',
              }}>
                <button
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs shrink-0" style={{ color: '#4ade80' }}>Q{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium text-sm" style={{ color: '#e8f5e9' }}>{item.q}</span>
                  </div>
                  <Icon
                    name={openFaq === i ? 'ChevronUp' : 'ChevronDown'}
                    size={14}
                    style={{ color: 'rgba(74, 222, 128, 0.5)', flexShrink: 0 } as React.CSSProperties}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pt-0" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.1)' }}>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: 'rgba(180, 210, 180, 0.7)' }}>
                      <span className="font-mono text-xs mr-2" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>A:</span>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
