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
              background: '#E8000E',
              border: 'none',
              borderRadius: 14,
              color: '#fff',
              fontWeight: 800,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(232,0,14,0.35)',
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
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        background: '#0D1B4B',
        boxShadow: '0 8px 40px rgba(13,27,75,0.45)',
        padding: '24px',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -20,
          width: 150, height: 280,
          background: '#E8000E',
          transform: 'rotate(-18deg)',
          zIndex: 0,
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute', top: -40, right: -55,
          width: 150, height: 280,
          background: '#F5C800',
          transform: 'rotate(-18deg)',
          zIndex: 0,
          opacity: 0.4,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>Школьная карта</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>№ 2025090012345</p>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: '#F5C800',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(245,200,0,0.4)',
            }}>
              <Icon name="CreditCard" size={26} style={{ color: '#0D1B4B' }} />
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 4 }}>Баланс</p>
          <p style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 16, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>{balance.toFixed(2)} ₽</p>
          <button
            onClick={() => setShowTopUp(true)}
            style={{
              background: '#F5C800',
              border: 'none',
              borderRadius: 14,
              padding: '10px 22px',
              color: '#0D1B4B',
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(245,200,0,0.4)',
            }}
          >
            Пополнить карту
          </button>
        </div>
      </div>

      {/* История покупок */}
      <div style={{ ...glass, padding: '16px' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Receipt" size={18} style={{ color: '#E8000E' }} />
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
                  <span className="font-bold text-sm" style={{ color: '#E8000E' }}>−{purchase.price.toFixed(2)} ₽</span>
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
          <Icon name="TrendingUp" size={18} style={{ color: '#F5C800' }} />
          <span className="font-bold text-base" style={{ color: 'rgba(30,10,10,0.9)' }}>Статистика</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div style={{
            textAlign: 'center',
            padding: '14px',
            background: 'rgba(13,27,75,0.08)',
            borderRadius: 14,
            border: '1.5px solid rgba(13,27,75,0.18)',
          }}>
            <p className="text-2xl font-black" style={{ color: '#0D1B4B' }}>4</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>Покупок сегодня</p>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '14px',
            background: 'rgba(245,200,0,0.15)',
            borderRadius: 14,
            border: '1.5px solid rgba(245,200,0,0.4)',
          }}>
            <p className="text-2xl font-black" style={{ color: '#92700a' }}>410 ₽</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>Потрачено за неделю</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchoolCardContent;