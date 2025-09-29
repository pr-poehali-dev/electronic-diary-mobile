import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Lesson {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isChanged: boolean;
}

interface ScheduleContentProps {
  schedule: Lesson[];
}

const ScheduleContent: React.FC<ScheduleContentProps> = ({ schedule }) => (
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

export default ScheduleContent;