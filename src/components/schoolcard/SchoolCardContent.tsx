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

const glass = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(32px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.25)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
};

const SchoolCardContent: React.FC<SchoolCardContentProps> = ({
  showTopUp,
  setShowTopUp,
  topUpAmount,
  setTopUpAmount
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}>
      <div style={{
        ...glass,
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(40px) saturate(2)',
        WebkitBackdropFilter: 'blur(40px) saturate(2)',
        padding: '24px',
        width: '100%',
        maxWidth: 360,
      }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: 'rgba(30,10,10,0.9)' }}>Пополнить карту</h3>
          <button onClick={() => setShowTopUp(false)}>
            <Icon name="X" size={22} style={{ color: 'rgba(0,0,0,0.4)' }} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(30,10,10,0.7)' }}>Сумма пополнения</label>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              placeholder="Введите сумму"
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: 12,
                outline: 'none',
                fontSize: 15,
                color: 'rgba(30,10,10,0.9)',
              }}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: 'rgba(30,10,10,0.7)' }}>Способ оплаты:</p>
            {[
              { icon: 'CreditCard', label: 'Банковская карта', color: 'rgba(59,130,246,0.85)' },
              { icon: 'Smartphone', label: 'СБП (Система быстрых платежей)', color: 'rgba(234,179,8,0.85)' },
            ].map((opt) => (
              <button key={opt.label} style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
              }}>
                <Icon name={opt.icon} size={20} style={{ color: opt.color }} />
                <span className="text-sm font-medium" style={{ color: 'rgba(30,10,10,0.85)' }}>{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            style={{
              width: '100%',
              padding: '13px',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(99,102,241,0.85))',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 14,
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
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

      {/* Hero — карточка с балансом */}
      <div style={{
        ...glass,
        background: 'linear-gradient(135deg, rgba(234,179,8,0.65) 0%, rgba(220,38,38,0.6) 100%)',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-white">Школьная карта</h2>
            <p className="text-white/70 text-sm">№ 2025090012345</p>
          </div>
          <Icon name="CreditCard" size={32} style={{ color: 'rgba(255,255,255,0.75)' }} />
        </div>
        <p className="text-white/70 text-sm">Баланс</p>
        <p className="text-3xl font-black text-white mb-4">{balance.toFixed(2)} ₽</p>
        <button
          onClick={() => setShowTopUp(true)}
          style={{
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: 12,
            padding: '8px 18px',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Пополнить карту
        </button>
      </div>

      {/* История покупок */}
      <div style={{ ...glass, padding: '16px' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Receipt" size={18} style={{ color: 'rgba(59,130,246,0.85)' }} />
          <span className="font-bold text-base" style={{ color: 'rgba(30,10,10,0.9)' }}>История покупок</span>
        </div>
        <div className="space-y-2">
          {purchases.map((purchase, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: 'rgba(30,10,10,0.9)' }}>{purchase.item}</span>
                  <span className="font-bold text-sm" style={{ color: 'rgba(220,38,38,0.9)' }}>−{purchase.price.toFixed(2)} ₽</span>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>
                  <span>{purchase.date}</span>
                  <span>·</span>
                  <span>{purchase.time}</span>
                  <span>·</span>
                  <span>{purchase.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div style={{ ...glass, padding: '16px' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="TrendingUp" size={18} style={{ color: 'rgba(234,179,8,0.9)' }} />
          <span className="font-bold text-base" style={{ color: 'rgba(30,10,10,0.9)' }}>Статистика</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div style={{
            textAlign: 'center',
            padding: '14px',
            background: 'rgba(59,130,246,0.12)',
            borderRadius: 14,
            border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <p className="text-2xl font-black" style={{ color: 'rgba(59,130,246,0.9)' }}>4</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>Покупок сегодня</p>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '14px',
            background: 'rgba(234,179,8,0.12)',
            borderRadius: 14,
            border: '1px solid rgba(234,179,8,0.25)',
          }}>
            <p className="text-2xl font-black" style={{ color: 'rgba(180,130,0,0.95)' }}>410 ₽</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>Потрачено за неделю</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchoolCardContent;