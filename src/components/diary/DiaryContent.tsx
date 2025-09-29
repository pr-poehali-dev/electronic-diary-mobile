import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface DiaryContentProps {
  schedule: Array<{
    time: string;
    subject: string;
    teacher: string;
    room: string;
    isChanged: boolean;
  }>;
  grades: Array<{
    subject: string;
    grade: number;
    date: string;
  }>;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ schedule, grades }) => (
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

export default DiaryContent;