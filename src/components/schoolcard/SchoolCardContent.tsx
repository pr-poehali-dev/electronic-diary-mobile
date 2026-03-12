import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Пополнить карту</h3>
          <button onClick={() => setShowTopUp(false)}>
            <Icon name="X" size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Сумма пополнения</label>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              placeholder="Введите сумму"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-diary-blue"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Способ оплаты:</p>
            <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-50">
              <Icon name="CreditCard" className="text-diary-blue" />
              <span>Банковская карта</span>
            </button>
            <button className="w-full p-3 border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-50">
              <Icon name="Smartphone" className="text-diary-yellow" />
              <span>СБП (Система быстрых платежей)</span>
            </button>
          </div>
          
          <button 
            className="w-full bg-diary-blue text-white py-3 rounded-lg font-medium hover:bg-diary-blue/90"
            onClick={() => {
              setShowTopUp(false);
              setTopUpAmount('');
            }}
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
      
      <div className="bg-gradient-to-r from-diary-yellow to-diary-red p-6 rounded-xl text-white relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Школьная карта</h2>
            <p className="text-white/90 text-sm">№ 2025090012345</p>
          </div>
          <Icon name="CreditCard" size={32} className="text-white/80" />
        </div>
        
        <div className="mb-4">
          <p className="text-white/80 text-sm">Баланс</p>
          <p className="text-3xl font-bold">{balance.toFixed(2)} ₽</p>
        </div>
        
        <button 
          onClick={() => setShowTopUp(true)}
          className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
        >
          Пополнить карту
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Receipt" className="text-diary-blue" />
            История покупок
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {purchases.map((purchase, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-diary-gray rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{purchase.item}</span>
                    <span className="font-bold text-diary-red">-{purchase.price.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{purchase.date}</span>
                    <span>•</span>
                    <span>{purchase.time}</span>
                    <span>•</span>
                    <span>{purchase.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" className="text-diary-yellow" />
            Статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-diary-blue/10 rounded-lg">
              <p className="text-2xl font-bold text-diary-blue">4</p>
              <p className="text-sm text-muted-foreground">Покупок сегодня</p>
            </div>
            <div className="text-center p-3 bg-diary-yellow/10 rounded-lg">
              <p className="text-2xl font-bold text-diary-yellow">410₽</p>
              <p className="text-sm text-muted-foreground">Потрачено за неделю</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolCardContent;