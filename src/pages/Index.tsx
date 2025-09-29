import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('diary');

  const schedule = [
    { time: '08:00', subject: 'Математика', teacher: 'Иванова А.П.', room: '204', isChanged: false },
    { time: '09:00', subject: 'Русский язык', teacher: 'Петрова М.И.', room: '105', isChanged: true },
    { time: '10:00', subject: 'История', teacher: 'Сидоров В.Н.', room: '301', isChanged: false },
    { time: '11:00', subject: 'Физика', teacher: 'Козлова Е.А.', room: '208', isChanged: false },
    { time: '12:00', subject: 'Химия', teacher: 'Морозов И.С.', room: '102', isChanged: true },
  ];

  const messages = [
    { from: 'Иванова А.П.', subject: 'Домашнее задание', time: '14:30', isRead: false },
    { from: 'Петрова М.И.', subject: 'Контрольная работа', time: '12:15', isRead: true },
    { from: 'Директор', subject: 'Собрание родителей', time: '09:00', isRead: false },
  ];

  const grades = [
    { subject: 'Математика', grade: 5, date: '25.09' },
    { subject: 'Русский язык', grade: 4, date: '24.09' },
    { subject: 'История', grade: 5, date: '23.09' },
  ];

  const DiaryContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-diary-red to-diary-blue p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Сегодня, 29 сентября</h2>
        <p className="text-white/90">Суббота • 5 уроков</p>
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

  const MessagesContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-diary-blue to-diary-yellow p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Сообщения</h2>
        <p className="text-white/90">3 новых сообщения</p>
      </div>

      <div className="space-y-3">
        {messages.map((message, idx) => (
          <Card key={idx} className={`${!message.isRead ? 'ring-2 ring-diary-red/20' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
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
                <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
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
    switch (activeTab) {
      case 'diary':
        return <DiaryContent />;
      case 'messages':
        return <MessagesContent />;
      case 'schedule':
        return <ScheduleContent />;
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
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'schedule' ? 'bg-diary-yellow text-black' : 'text-gray-600'
              }`}
            >
              <Icon name="Calendar" size={20} />
              <span className="text-xs">Расписание</span>
            </Button>

            <Button
              variant={activeTab === 'school' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('school')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'school' ? 'bg-diary-red text-white' : 'text-gray-600'
              }`}
            >
              <Icon name="Building" size={20} />
              <span className="text-xs">Школа</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;