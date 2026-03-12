import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Server = 'chernarus' | 'sakhal' | 'all';
type Category = 'all' | 'weapons' | 'clothes' | 'supplies' | 'vip' | 'vehicles';

interface ShopItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: Category;
  server: Server;
  emoji: string;
  popular?: boolean;
  new?: boolean;
}

interface CartItem extends ShopItem {
  qty: number;
}

const ITEMS: ShopItem[] = [
  { id: 1, name: 'AKM + 4 магазина', desc: 'Штурмовая винтовка с боекомплектом на старт', price: 149, category: 'weapons', server: 'all', emoji: '🔫', popular: true },
  { id: 2, name: 'M4A1 Tactical', desc: 'M4A1 с прикладом, рукоятью и 3 магазинами', price: 249, category: 'weapons', server: 'all', emoji: '🔫' },
  { id: 3, name: 'Снайперский набор', desc: 'SVD + 2 магазина + прицел ПСО-1', price: 399, category: 'weapons', server: 'chernarus', emoji: '🎯' },
  { id: 4, name: 'Зимний камуфляж', desc: 'Полный комплект белого маскхалата', price: 99, category: 'clothes', server: 'sakhal', emoji: '🥼', new: true },
  { id: 5, name: 'Военная форма', desc: 'Комплект военного снаряжения + берцы', price: 89, category: 'clothes', server: 'all', emoji: '👗' },
  { id: 6, name: 'Стартовый набор', desc: 'Еда, вода, медикаменты на 3 дня игры', price: 59, category: 'supplies', server: 'all', emoji: '🎒', popular: true },
  { id: 7, name: 'Медицинский ящик', desc: 'Дефибриллятор, кровь, IV-капельницы x5', price: 129, category: 'supplies', server: 'all', emoji: '🏥' },
  { id: 8, name: 'VIP Статус — 30 дней', desc: 'Приоритетный слот, цветное имя в чате, 10% скидка в магазине', price: 299, category: 'vip', server: 'all', emoji: '👑', popular: true },
  { id: 9, name: 'VIP+ Статус — 30 дней', desc: 'Всё из VIP + телепортация домой 1/сутки', price: 499, category: 'vip', server: 'all', emoji: '💎' },
  { id: 10, name: 'Lada Niva', desc: 'Отремонтированный автомобиль у спавна', price: 349, category: 'vehicles', server: 'chernarus', emoji: '🚗', new: true },
  { id: 11, name: 'Снегоход', desc: 'Быстрый транспорт для снежных равнин', price: 449, category: 'vehicles', server: 'sakhal', emoji: '🛷', new: true },
  { id: 12, name: 'Генератор + топливо', desc: 'Генератор + 5 канистр — электричество в базе', price: 179, category: 'supplies', server: 'all', emoji: '⚡' },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'Все товары' },
  { id: 'weapons', label: 'Оружие' },
  { id: 'clothes', label: 'Одежда' },
  { id: 'supplies', label: 'Снаряжение' },
  { id: 'vip', label: 'VIP' },
  { id: 'vehicles', label: 'Транспорт' },
];

const PURCHASE_HISTORY = [
  { id: 'GV-1842', item: 'VIP Статус — 30 дней', server: 'Chernarus', date: '10.03.2026', price: 299, status: 'Выдан' },
  { id: 'GV-1831', item: 'Стартовый набор', server: 'Sakhal', date: '08.03.2026', price: 59, status: 'Выдан' },
  { id: 'GV-1820', item: 'AKM + 4 магазина', server: 'Chernarus', date: '05.03.2026', price: 149, status: 'Выдан' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeServer, setActiveServer] = useState<Server>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [tab, setTab] = useState<'shop' | 'history'>('shop');

  const filtered = ITEMS.filter(item =>
    (activeCategory === 'all' || item.category === activeCategory) &&
    (activeServer === 'all' || item.server === 'all' || item.server === activeServer)
  );

  const addToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(c => c.id !== id));

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen biohazard-bg grid-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// STORE</span>
            <h1 className="font-heading font-black text-4xl tracking-widest mt-1" style={{
              color: '#4ade80',
              textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
            }}>МАГАЗИН</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex rounded-sm overflow-hidden" style={{ border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              {['shop', 'history'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as 'shop' | 'history')}
                  className="px-4 py-2 text-xs font-mono transition-all"
                  style={{
                    background: tab === t ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                    color: tab === t ? '#4ade80' : 'rgba(74, 222, 128, 0.5)',
                    borderRight: t === 'shop' ? '1px solid rgba(74, 222, 128, 0.2)' : 'none',
                  }}
                >
                  {t === 'shop' ? 'ВИТРИНА' : 'ИСТОРИЯ'}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-sm transition-all"
              style={{
                background: cart.length > 0 ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.05)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: '#4ade80',
              }}
            >
              <Icon name="ShoppingCart" size={16} />
              <span className="font-mono text-xs">{totalItems}</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#4ade80', color: '#060a06' }}>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {tab === 'shop' ? (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Server filter */}
              <div className="p-4 rounded-sm" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
                <div className="font-mono text-xs mb-3" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// СЕРВЕР</div>
                {[
                  { id: 'all' as Server, label: 'Оба сервера' },
                  { id: 'chernarus' as Server, label: 'Chernarus' },
                  { id: 'sakhal' as Server, label: 'Sakhal' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveServer(s.id)}
                    className="w-full text-left px-3 py-2 rounded-sm mb-1 text-sm transition-all font-mono"
                    style={{
                      background: activeServer === s.id ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                      color: activeServer === s.id ? '#4ade80' : 'rgba(180, 210, 180, 0.6)',
                      borderLeft: activeServer === s.id ? '2px solid #4ade80' : '2px solid transparent',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              <div className="p-4 rounded-sm" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
                <div className="font-mono text-xs mb-3" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// КАТЕГОРИЯ</div>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="w-full text-left px-3 py-2 rounded-sm mb-1 text-sm transition-all font-mono"
                    style={{
                      background: activeCategory === cat.id ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                      color: activeCategory === cat.id ? '#4ade80' : 'rgba(180, 210, 180, 0.6)',
                      borderLeft: activeCategory === cat.id ? '2px solid #4ade80' : '2px solid transparent',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Balance block */}
              <div className="p-4 rounded-sm" style={{ background: 'rgba(13, 26, 13, 0.8)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
                <div className="font-mono text-xs mb-3" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>// БАЛАНС</div>
                <div className="text-2xl font-heading font-bold mb-3" style={{ color: '#4ade80' }}>
                  0 ₽
                </div>
                <button className="virus-btn w-full py-2 rounded-sm text-xs">
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Plus" size={12} />
                    Пополнить
                  </span>
                </button>
                <p className="text-xs mt-2 text-center font-mono" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>
                  Требуется Steam авторизация
                </p>
              </div>
            </div>

            {/* Items grid */}
            <div className="lg:col-span-3">
              {cartOpen && cart.length > 0 && (
                <div className="mb-6 p-4 rounded-sm" style={{
                  background: 'rgba(13, 26, 13, 0.95)',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  boxShadow: '0 0 20px rgba(74, 222, 128, 0.1)',
                }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-bold tracking-wider" style={{ color: '#e8f5e9' }}>КОРЗИНА</span>
                    <button onClick={() => setCartOpen(false)} style={{ color: 'rgba(74, 222, 128, 0.5)' }}>
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-sm" style={{
                        background: 'rgba(74, 222, 128, 0.05)',
                        border: '1px solid rgba(74, 222, 128, 0.1)',
                      }}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.emoji}</span>
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#e8f5e9' }}>{item.name}</div>
                            <div className="text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>
                              {item.server === 'all' ? 'Оба сервера' : item.server} × {item.qty}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold" style={{ color: '#4ade80' }}>
                            {item.price * item.qty} ₽
                          </span>
                          <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444' }}>
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(74, 222, 128, 0.2)' }}>
                    <div className="font-heading font-bold text-xl" style={{ color: '#4ade80' }}>
                      Итого: {totalPrice} ₽
                    </div>
                    <button className="virus-btn px-6 py-2 rounded-sm text-sm">
                      <span className="flex items-center gap-2">
                        <Icon name="CreditCard" size={14} />
                        Оплатить
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((item) => (
                  <div key={item.id} className="shop-card rounded-sm overflow-hidden relative">
                    {item.popular && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 text-xs font-mono rounded-sm z-10"
                        style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid rgba(234, 179, 8, 0.4)', color: '#eab308' }}>
                        ⭐ ХИТ
                      </div>
                    )}
                    {item.new && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 text-xs font-mono rounded-sm z-10"
                        style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', color: '#4ade80' }}>
                        NEW
                      </div>
                    )}

                    {/* Item icon area */}
                    <div className="flex items-center justify-center py-6" style={{ background: 'rgba(74, 222, 128, 0.03)' }}>
                      <span className="text-5xl">{item.emoji}</span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading font-bold text-sm leading-tight tracking-wide" style={{ color: '#e8f5e9' }}>
                          {item.name}
                        </h3>
                        <span className="tag shrink-0">
                          {item.server === 'all' ? 'ALL' : item.server.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-xl" style={{ color: '#4ade80' }}>
                          {item.price} ₽
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-heading font-bold tracking-wider transition-all"
                          style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.3)',
                            color: '#4ade80',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(74, 222, 128, 0.2)';
                            (e.currentTarget as HTMLElement).style.borderColor = '#4ade80';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(74, 222, 128, 0.1)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74, 222, 128, 0.3)';
                          }}
                        >
                          <Icon name="Plus" size={12} />
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>
                  <Icon name="Package" size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-mono text-sm">// Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* History tab */
          <div className="max-w-3xl">
            <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(74, 222, 128, 0.15)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(74, 222, 128, 0.05)', borderBottom: '1px solid rgba(74, 222, 128, 0.15)' }}>
                    {['ID заказа', 'Товар', 'Сервер', 'Дата', 'Сумма', 'Статус'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-mono" style={{ color: 'rgba(74, 222, 128, 0.6)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PURCHASE_HISTORY.map((order, i) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: '1px solid rgba(74, 222, 128, 0.08)',
                        background: i % 2 === 0 ? 'rgba(13, 26, 13, 0.4)' : 'rgba(6, 10, 6, 0.6)',
                      }}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: 'rgba(74, 222, 128, 0.7)' }}>{order.id}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#e8f5e9' }}>{order.item}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>{order.server}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>{order.date}</td>
                      <td className="px-4 py-3 font-heading font-bold text-sm" style={{ color: '#4ade80' }}>{order.price} ₽</td>
                      <td className="px-4 py-3">
                        <span className="tag" style={{ color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>
                          ✓ {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono mt-4 text-center" style={{ color: 'rgba(74, 222, 128, 0.3)' }}>
              // История покупок доступна после авторизации через Steam
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
