import React from 'react';
import Icon from '@/components/ui/icon';

interface Purchase {
  date: string;
  time: string;
  item: string;
  price: number;
  place: string;
}

interface SchoolCardContentProps {
  showTopUp: boolean;
  setShowTopUp: (show: boolean) => void;
  topUpAmount: string;
  setTopUpAmount: (amount: string) => void;
}

const SchoolCardContent: React.FC<SchoolCardContentProps> = ({
  showTopUp, setShowTopUp, topUpAmount, setTopUpAmount
}) => {
  const balance = 847.50;
  const purchases: Purchase[] = [
    { date: '29.09', time: '12:45', item: 'Обед комплексный', price: 95.00, place: 'Столовая 1 этаж' },
    { date: '28.09', time: '13:20', item: 'Пицца + сок', price: 120.00, place: 'Буфет 2 этаж' },
    { date: '28.09', time: '10:15', item: 'Булочка с чаем', price: 45.00, place: 'Буфет 2 этаж' },
    { date: '27.09', time: '12:50', item: 'Обед + компот', price: 85.00, place: 'Столовая 1 этаж' },
    { date: '26.09', time: '14:00', item: 'Сэндвич', price: 65.00, place: 'Буфет 2 этаж' }
  ];

  const TopUpModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="glass w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Пополнить карту</h3>
          <button onClick={() => setShowTopUp(false)} className="text-white/50 hover:text-white/80">
            <Icon name="X" size={22} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Сумма пополнения</label>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              placeholder="Введите сумму"
              className="w-full px-4 py-2.5 rounded-xl text-white placeholder-white/30 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-white/70 text-sm font-medium">Способ оплаты:</p>
            {[
              { icon: 'CreditCard', label: 'Банковская карта' },
              { icon: 'Smartphone', label: 'СБП' },
            ].map((opt) => (
              <button key={opt.label}
                className="glass-row w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white text-sm transition-colors">
                <Icon name={opt.icon} size={18} className="text-white/60" />
                {opt.label}
              </button>
            ))}
          </div>
          <button
            className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'rgba(220,38,38,0.7)', border: '1px solid rgba(255,100,80,0.4)' }}
            onClick={() => { setShowTopUp(false); setTopUpAmount(''); }}
          >
            Пополнить
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {showTopUp && <TopUpModal />}

      {/* Карточка баланса */}
      <div className="glass-red relative overflow-hidden p-6">
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div>
            <p className="text-white/60 text-sm">Школьная карта</p>
            <p className="text-white/40 text-xs">№ 2025090012345</p>
          </div>
          <Icon name="CreditCard" size={28} className="text-white/40" />
        </div>
        <div className="mb-5 relative z-10">
          <p className="text-white/60 text-sm">Баланс</p>
          <p className="text-4xl font-black text-white">{balance.toFixed(2)} ₽</p>
        </div>
        <button
          onClick={() => setShowTopUp(true)}
          className="px-5 py-2 rounded-xl text-sm font-semibold text-white relative z-10 transition-opacity hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          Пополнить карту
        </button>
      </div>

      {/* История */}
      <div className="glass">
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <Icon name="Receipt" size={18} className="text-white/70" />
          <span className="font-semibold text-white">История покупок</span>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {purchases.map((p, idx) => (
            <div key={idx} className="glass-row flex items-center justify-between px-3 py-2.5">
              <div>
                <p className="text-white/90 text-sm font-medium">{p.item}</p>
                <p className="text-white/40 text-xs">{p.date} · {p.time} · {p.place}</p>
              </div>
              <span className="text-red-300 font-bold text-sm">-{p.price.toFixed(0)}₽</span>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div className="glass">
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <Icon name="TrendingUp" size={18} className="text-white/70" />
          <span className="font-semibold text-white">Статистика</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          <div className="glass-row text-center py-4">
            <p className="text-3xl font-black text-white">4</p>
            <p className="text-white/50 text-xs mt-1">Покупок сегодня</p>
          </div>
          <div className="glass-row text-center py-4">
            <p className="text-3xl font-black text-white">410₽</p>
            <p className="text-white/50 text-xs mt-1">За неделю</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchoolCardContent;
