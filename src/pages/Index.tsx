import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  const schedule = [
    { time: '08:00', subject: 'Математика', teacher: 'Иванова А.П.', room: '204', isChanged: false },
    { time: '09:00', subject: 'Русский язык', teacher: 'Петрова М.И.', room: '105', isChanged: true },
    { time: '10:00', subject: 'История', teacher: 'Сидоров В.Н.', room: '301', isChanged: false },
    { time: '11:00', subject: 'Физика', teacher: 'Козлова Е.А.', room: '208', isChanged: false },
    { time: '12:00', subject: 'Химия', teacher: 'Морозов И.С.', room: '102', isChanged: true },
  ];

  const messages = [
    { 
      from: 'Цвирко В.Ю.', 
      subject: 'Привет, я сегодня на концерте НКЕЯ, ГЛАМУР...', 
      time: '14:30', 
      isRead: false,
      avatar: 'https://cdn.poehali.dev/files/6c7e1dfb-cebc-4026-b408-d2a276f38142.jpg'
    },
    { 
      from: 'НСКИН', 
      subject: 'Контрольная работа', 
      time: '12:15', 
      isRead: true,
      avatar: 'https://cdn.poehali.dev/files/141b5ec4-0ddf-4efe-a301-a34a39fdb83c.jpg'
    },
    { 
      from: 'Дрёмов А.А.', 
      subject: 'Собрание родителей', 
      time: '09:00', 
      isRead: false,
      avatar: 'https://cdn.poehali.dev/files/f0c5a372-c374-434c-a358-2afc88e936d5.jpg'
    },
    { 
      from: 'Борисова М.А.', 
      subject: 'Подготовка к олимпиаде', 
      time: '16:45', 
      isRead: false,
      avatar: 'https://cdn.poehali.dev/files/a5ff32d1-9b44-4f13-92f8-465fa0ded17e.jpg'
    },
    { 
      from: 'Сидни Прескотт', 
      subject: 'Экскурсия в музей', 
      time: '08:20', 
      isRead: true,
      avatar: 'https://cdn.poehali.dev/files/b394fa1c-cfef-4be3-8714-181a88e2e399.jpg'
    },
  ];

  const grades = [
    { subject: 'Математика', grade: 5, date: '25.09' },
    { subject: 'Русский язык', grade: 4, date: '24.09' },
    { subject: 'История', grade: 5, date: '23.09' },
  ];

  const DiaryContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-diary-red rounded-xl text-white relative overflow-hidden h-[280px] flex flex-col">
        {/* Желтые овальные формы как на фото */}
        <div className="absolute top-12 left-4 w-32 h-16 border-4 border-diary-yellow rounded-full opacity-90 transform rotate-12"></div>
        <div className="absolute top-20 left-8 w-24 h-12 border-3 border-diary-yellow rounded-full opacity-70 transform rotate-6"></div>
        
        {/* Основной контент */}
        <div className="relative z-10 p-6 flex-1">
          <div className="mb-4">
            <h1 className="text-4xl font-black leading-tight mb-1">
              Суббота
            </h1>
            <h1 className="text-2xl font-black leading-tight mb-1">
              29/09
            </h1>
            <h1 className="text-3xl font-black leading-tight mb-1">
              Дневник
            </h1>
            <p className="text-lg font-bold mb-1">
              7 уроков
            </p>
            <p className="text-lg font-bold">
              Сентябрь 2025
            </p>
          </div>
        </div>
        
        {/* Горный пейзаж внизу */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200 opacity-90">
          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-r from-blue-200 via-gray-300 to-blue-100"></div>
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 400 64" fill="none">
            <path d="M0 64 L50 20 L100 35 L150 15 L200 30 L250 10 L300 25 L350 15 L400 30 L400 64 Z" 
                  fill="#6B7280" opacity="0.8"/>
            <path d="M0 64 L80 30 L140 45 L200 25 L280 40 L340 20 L400 35 L400 64 Z" 
                  fill="#9CA3AF" opacity="0.6"/>
          </svg>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" className="text-diary-red" />
            Последние оценки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {grades.map((grade, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-diary-gray rounded-lg">
                <span className="font-medium">{grade.subject}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={grade.grade >= 4 ? "default" : "destructive"}>
                    {grade.grade}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{grade.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" className="text-diary-blue" />
            Расписание на сегодня
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule.slice(0, 3).map((lesson, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-diary-gray rounded-lg">
                <div className="text-sm font-mono text-diary-blue font-bold">
                  {lesson.time}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lesson.subject}</div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.teacher} • Каб. {lesson.room}
                  </div>
                </div>
                {lesson.isChanged && (
                  <Badge className="bg-diary-yellow text-black">
                    Изменено
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ChatDialog = ({ chat, onBack }) => {
    const chatMessages = [
      {
        text: chat.subject,
        isTeacher: true,
        time: chat.time,
        avatar: chat.avatar
      },
      {
        text: "Спасибо за информацию! А когда будет следующий урок?",
        isTeacher: false,
        time: "14:32"
      },
      {
        text: "Завтра в обычное время, не забудьте учебники!",
        isTeacher: true,
        time: "14:35",
        avatar: chat.avatar
      }
    ];

    const sendMessage = () => {
      if (newMessage.trim()) {
        // Здесь можно добавить логику отправки
        setNewMessage('');
      }
    };

    return (
      <div className="space-y-4 animate-fade-in h-full flex flex-col">
        {/* Заголовок чата */}
        <div className="bg-gradient-to-r from-diary-blue to-diary-yellow p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="ArrowLeft" size={24} />
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={chat.avatar} 
                alt={chat.from}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{chat.from}</h2>
              <p className="text-white/90 text-sm">онлайн</p>
            </div>
          </div>
        </div>

        {/* Сообщения */}
        <div className="flex-1 space-y-3 min-h-0 overflow-y-auto">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.isTeacher ? '' : 'flex-row-reverse'}`}>
              {msg.isTeacher && (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-diary-yellow flex-shrink-0">
                  <img 
                    src={msg.avatar} 
                    alt={chat.from}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                msg.isTeacher 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-diary-blue text-white'
              }`}>
                <p className={`text-sm ${msg.isTeacher ? 'text-gray-800' : 'text-white'}`}>
                  {msg.text}
                </p>
                <span className={`text-xs mt-1 block ${
                  msg.isTeacher ? 'text-gray-500' : 'text-white/70'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-diary-blue"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-diary-blue text-white p-2 rounded-full hover:bg-diary-blue/90 transition-colors"
            >
              <Icon name="Send" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MessagesContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-diary-red to-red-600 p-4 rounded-xl text-white relative overflow-hidden">
        <h2 className="text-xl font-bold mb-2">Сообщения</h2>
        <p className="text-white/90">5 новых сообщений</p>
        
        {/* Стикер в правом верхнем углу */}
        <div className="absolute -top-4 -right-4 w-24 h-24 transform rotate-12">
          <img 
            src="https://cdn.poehali.dev/files/93758476-4e03-4819-9cc0-77c0592bfd73.jpg" 
            alt="sticker"
            className="w-full h-full object-contain drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message, idx) => (
          <Card key={idx} className={`${!message.isRead ? 'ring-2 ring-diary-red/20' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-diary-yellow flex-shrink-0">
                  <img 
                    src={message.avatar} 
                    alt={message.from}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{message.from}</span>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-diary-red rounded-full" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{message.subject}</p>
                  <span className="text-xs text-diary-blue">{message.time}</span>
                </div>
                <button 
                  onClick={() => setSelectedChat(message)}
                  className="text-muted-foreground hover:text-diary-blue transition-colors"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ScheduleContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-diary-yellow to-diary-red p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Расписание уроков</h2>
        <p className="text-white/90">Суббота, 29 сентября</p>
      </div>

      <div className="space-y-3">
        {schedule.map((lesson, idx) => (
          <Card key={idx} className="animate-scale-in" style={{animationDelay: `${idx * 0.1}s`}}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold text-diary-blue min-w-[60px]">
                  {lesson.time}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{lesson.subject}</div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.teacher}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon name="MapPin" size={14} className="text-diary-blue" />
                    <span className="text-sm">Кабинет {lesson.room}</span>
                  </div>
                </div>
                {lesson.isChanged && (
                  <Badge className="bg-diary-yellow text-black font-medium">
                    <Icon name="AlertTriangle" size={12} className="mr-1" />
                    Изменено
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SchoolCardContent = () => {
    const balance = 847.50;
    const purchases = [
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
        
        <div className="bg-gradient-to-r from-diary-blue via-diary-yellow to-diary-red p-6 rounded-xl text-white relative overflow-hidden">
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
                <p className="text-2xl font-bold text-diary-blue">7</p>
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

  const SchoolMapContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-diary-red via-diary-blue to-diary-yellow p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Школьная карта</h2>
        <p className="text-white/90">МБОУ "Гимназия №1"</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-diary-red text-white">
          <Icon name="Users" className="mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold">1247</p>
          <p className="text-sm opacity-90">Учеников</p>
        </Card>
        <Card className="p-4 text-center bg-diary-blue text-white">
          <Icon name="GraduationCap" className="mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold">89</p>
          <p className="text-sm opacity-90">Учителей</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Building" className="text-diary-blue" />
            Информация о школе
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="MapPin" className="text-diary-red" />
              <div>
                <p className="font-medium">Адрес</p>
                <p className="text-sm text-muted-foreground">ул. Школьная, 15</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Phone" className="text-diary-blue" />
              <div>
                <p className="font-medium">Телефон</p>
                <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" className="text-diary-yellow" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">info@school1.edu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calendar" className="text-diary-red" />
            Режим работы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Понедельник - Пятница</span>
              <span className="font-medium">8:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Суббота</span>
              <span className="font-medium">8:00 - 14:00</span>
            </div>
            <div className="flex justify-between">
              <span>Воскресенье</span>
              <span className="font-medium text-diary-red">Выходной</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    // Если выбран чат, показываем диалог
    if (selectedChat) {
      return <ChatDialog chat={selectedChat} onBack={() => setSelectedChat(null)} />;
    }

    switch (activeTab) {
      case 'diary':
        return <DiaryContent />;
      case 'messages':
        return <MessagesContent />;
      case 'schedule':
        return <ScheduleContent />;
      case 'card':
        return <SchoolCardContent />;
      case 'school':
        return <SchoolMapContent />;
      default:
        return <DiaryContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-20">
        <div className="p-4">
          {renderContent()}
        </div>

        {/* Мобильная навигация */}
        {!selectedChat && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <Button
              variant={activeTab === 'diary' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('diary')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'diary' ? 'bg-diary-red text-white' : 'text-gray-600'
              }`}
            >
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Дневник</span>
            </Button>

            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'messages' ? 'bg-diary-blue text-white' : 'text-gray-600'
              }`}
            >
              <Icon name="MessageCircle" size={20} />
              <span className="text-xs">Сообщения</span>
            </Button>

            <Button
              variant={activeTab === 'schedule' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('schedule')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'schedule' ? 'bg-diary-yellow text-black' : 'text-gray-600'
              }`}
            >
              <Icon name="Calendar" size={18} />
              <span className="text-xs">Расписание</span>
            </Button>

            <Button
              variant={activeTab === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('card')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'card' ? 'bg-diary-blue text-white' : 'text-gray-600'
              }`}
            >
              <Icon name="CreditCard" size={18} />
              <span className="text-xs">Карта</span>
            </Button>

            <Button
              variant={activeTab === 'school' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('school')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'school' ? 'bg-diary-red text-white' : 'text-gray-600'
              }`}
            >
              <Icon name="Building" size={18} />
              <span className="text-xs">Школа</span>
            </Button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Index;