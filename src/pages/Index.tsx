import React, { useState } from 'react';
import DiaryContent from '@/components/diary/DiaryContent';
import MessagesContent from '@/components/messages/MessagesContent';
import ChatDialog from '@/components/messages/ChatDialog';
import NewChatDialog from '@/components/messages/NewChatDialog';
import ScheduleContent from '@/components/schedule/ScheduleContent';
import SchoolCardContent from '@/components/schoolcard/SchoolCardContent';
import ProfileContent from '@/components/profile/ProfileContent';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import ThemeToggle from '@/components/ThemeToggle';

const MY_USER_ID = 1;

const Index = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

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
      subject: 'Напоминаю: завтра контрольная по алгебре — тригонометрия и логарифмы', 
      time: '14:30', 
      isRead: false,
      role: 'teacher' as const,
      avatar: 'https://cdn.poehali.dev/files/6c7e1dfb-cebc-4026-b408-d2a276f38142.jpg'
    },
    { 
      from: 'НСКИН', 
      subject: 'Контрольная по физике перенесена на пятницу, 4-й урок', 
      time: '12:15', 
      isRead: true,
      role: 'teacher' as const,
      avatar: 'https://cdn.poehali.dev/files/141b5ec4-0ddf-4efe-a301-a34a39fdb83c.jpg'
    },
    { 
      from: 'Дрёмов А.А.', 
      subject: 'Собрание родителей в пятницу в 18:00 — итоги четверти', 
      time: '09:00', 
      isRead: false,
      role: 'teacher' as const,
      avatar: 'https://cdn.poehali.dev/projects/7f76478c-2204-4f4a-9fca-9c377ba2402c/bucket/38eb0ea2-4cde-4165-85eb-327d31de44a3.jpg'
    },
    { 
      from: 'Борисова М.А.', 
      subject: 'Задачи из сборника по химии — стр. 45–60 к олимпиаде', 
      time: '16:45', 
      isRead: false,
      role: 'teacher' as const,
      avatar: 'https://cdn.poehali.dev/files/a5ff32d1-9b44-4f13-92f8-465fa0ded17e.jpg'
    },
    { 
      from: 'Сидни Прескотт', 
      subject: 'Экскурсия в музей — сдаём 350 руб. старосте до среды', 
      time: '08:20', 
      isRead: true,
      role: 'student' as const,
      avatar: 'https://cdn.poehali.dev/files/b394fa1c-cfef-4be3-8714-181a88e2e399.jpg'
    },
    {
      from: 'Карина Белова',
      subject: 'Можешь скинуть домашку по биологии? Параграф 18?',
      time: 'Вчера',
      isRead: false,
      role: 'student' as const,
      avatar: 'https://cdn.poehali.dev/files/a5ff32d1-9b44-4f13-92f8-465fa0ded17e.jpg'
    },
    {
      from: 'Максим Ефимов',
      subject: 'Ты идёшь на тренировку после школы?',
      time: 'Вчера',
      isRead: true,
      role: 'student' as const,
      avatar: 'https://cdn.poehali.dev/files/141b5ec4-0ddf-4efe-a301-a34a39fdb83c.jpg'
    },
    {
      from: 'Алина Романова',
      subject: 'Привет! Списала с доски расписание на следующую неделю',
      time: 'Пн',
      isRead: true,
      role: 'student' as const,
      avatar: 'https://cdn.poehali.dev/files/6c7e1dfb-cebc-4026-b408-d2a276f38142.jpg'
    },
    {
      from: 'Денис Краснов',
      subject: 'Когда сдавать проект по информатике?',
      time: 'Пн',
      isRead: false,
      role: 'student' as const,
      avatar: 'https://cdn.poehali.dev/files/b394fa1c-cfef-4be3-8714-181a88e2e399.jpg'
    },
  ];

  const grades = [
    { subject: 'Математика', grade: 5, date: '25.09' },
    { subject: 'Русский язык', grade: 4, date: '24.09' },
    { subject: 'История', grade: 5, date: '23.09' },
  ];

  const renderContent = () => {
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
        return <MessagesContent messages={messages} onChatOpen={setSelectedChat} onNewChat={() => setShowNewChat(true)} />;
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
      case 'profile':
        return <ProfileContent />;
      default:
        return <DiaryContent schedule={schedule} grades={grades} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-md mx-auto bg-card min-h-screen relative pb-20">
        <div className="fixed top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        
        <div className="p-4">
          {renderContent()}
        </div>

        {!selectedChat && (
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {showNewChat && (
          <NewChatDialog
            currentUserId={MY_USER_ID}
            onClose={() => setShowNewChat(false)}
            onChatStarted={(partnerId, partnerName) => {
              setShowNewChat(false);
              setSelectedChat({
                from: partnerName,
                subject: '',
                time: '',
                avatar: '',
                role: 'student' as const,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
