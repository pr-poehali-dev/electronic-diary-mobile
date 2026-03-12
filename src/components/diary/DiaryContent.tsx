import React from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

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

const DiaryContent: React.FC<DiaryContentProps> = ({ schedule, grades }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Hero */}
      <div className="glass-red relative overflow-hidden p-6" style={{ minHeight: 220 }}>
        <div className="absolute top-8 right-8 w-28 h-28 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }} />
        <div className="absolute top-16 right-16 w-14 h-14 rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }} />

        <div className="relative z-10">
          <p className="text-white/60 text-sm font-medium mb-1">Электронный дневник</p>
          <h1 className="text-5xl font-black text-white leading-tight">Суббота</h1>
          <h2 className="text-2xl font-bold text-white/80 mt-1">29 сентября</h2>
          <div className="flex gap-3 mt-4">
            <span className="px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
              7 уроков
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
              2025–2026
            </span>
          </div>
        </div>
      </div>

      {/* Оценки */}
      <div
        className="glass cursor-pointer hover:scale-[1.01] transition-transform"
        onClick={() => navigate('/grades')}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" size={18} className="text-white/70" />
            <span className="font-semibold text-white">Последние оценки</span>
          </div>
          <Icon name="ChevronRight" size={18} className="text-white/40" />
        </div>
        <div className="px-4 pb-4 space-y-2">
          {grades.map((grade, idx) => (
            <div key={idx} className="glass-row flex items-center justify-between px-3 py-2">
              <span className="text-white/90 text-sm font-medium">{grade.subject}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold px-2 py-0.5 rounded-lg ${
                  grade.grade >= 4 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {grade.grade}
                </span>
                <span className="text-white/40 text-xs">{grade.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Расписание */}
      <div className="glass">
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <Icon name="Clock" size={18} className="text-white/70" />
          <span className="font-semibold text-white">Расписание на сегодня</span>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {schedule.slice(0, 3).map((lesson, idx) => (
            <div key={idx} className="glass-row flex items-center gap-3 px-3 py-2">
              <span className="text-xs font-mono font-bold text-white/50 min-w-[52px]">{lesson.time}</span>
              <div className="flex-1">
                <div className="text-white/90 text-sm font-medium">{lesson.subject}</div>
                <div className="text-white/50 text-xs">{lesson.teacher} · каб. {lesson.room}</div>
              </div>
              {lesson.isChanged && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-yellow-300"
                  style={{ background: 'rgba(234,179,8,0.2)', border: '1px solid rgba(234,179,8,0.35)' }}>
                  Изменено
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DiaryContent;
