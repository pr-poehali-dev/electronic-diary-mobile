import React, { useState } from 'react';
import DiaryContent from '@/components/diary/DiaryContent';
import MessagesContent from '@/components/messages/MessagesContent';
import ChatDialog from '@/components/messages/ChatDialog';
import ScheduleContent from '@/components/schedule/ScheduleContent';
import SchoolCardContent from '@/components/schoolcard/SchoolCardContent';
import BottomNavigation from '@/components/navigation/BottomNavigation';

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

  const renderContent = () => {
    // Если выбран чат, показываем диалог
    if (selectedChat) {
      return (
        <ChatDialog 
          chat={selectedChat} 
          onBack={() => setSelectedChat(null)}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      );
    }

    switch (activeTab) {
      case 'diary':
        return <DiaryContent schedule={schedule} grades={grades} />;
      case 'messages':
        return <MessagesContent messages={messages} onChatOpen={setSelectedChat} />;
      case 'schedule':
        return <ScheduleContent schedule={schedule} />;
      case 'card':
        return (
          <SchoolCardContent 
            showTopUp={showTopUp}
            setShowTopUp={setShowTopUp}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
          />
        );
      default:
        return <DiaryContent schedule={schedule} grades={grades} />;
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
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default Index;