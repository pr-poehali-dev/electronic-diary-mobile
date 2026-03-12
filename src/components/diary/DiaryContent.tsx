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

const glass = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(32px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.25)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
};

const DiaryContent: React.FC<DiaryContentProps> = ({ schedule, grades }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Hero-карточка */}
      <div style={{
        ...glass,
        background: 'linear-gradient(135deg, rgba(220,38,38,0.72) 0%, rgba(239,68,68,0.55) 100%)',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 180,
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, left: 60,
          width: 100, height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
        }} />
        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Сентябрь 2025</p>
        <h1 className="text-white text-4xl font-black leading-tight">Суббота</h1>
        <h2 className="text-white/90 text-2xl font-bold">29 / 09</h2>
        <p className="text-white/80 text-lg font-semibold mt-1">7 уроков · Дневник</p>
      </div>

      {/* Последние оценки */}
      <div
        style={{ ...glass, padding: '16px', cursor: 'pointer' }}
        onClick={() => navigate('/grades')}
      >
        <div className="flex items-center gap-2 mb-3">
          <Icon name="BookOpen" size={18} style={{ color: 'rgba(220,38,38,0.85)' }} />
          <span className="font-bold text-base" style={{ color: 'rgba(30,10,10,0.9)' }}>Последние оценки</span>
          <Icon name="ChevronRight" size={18} className="ml-auto" style={{ color: 'rgba(0,0,0,0.35)' }} />
        </div>
        <div className="space-y-2">
          {grades.map((grade, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              <span className="font-medium text-sm" style={{ color: 'rgba(30,10,10,0.85)' }}>{grade.subject}</span>
              <div className="flex items-center gap-2">
                <span style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: grade.grade >= 4 ? 'rgba(22,163,74,0.95)' : 'rgba(220,38,38,0.95)',
                  minWidth: 18,
                  textAlign: 'center',
                }}>{grade.grade}</span>
                <span className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>{grade.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Расписание на сегодня */}
      <div style={{ ...glass, padding: '16px' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Clock" size={18} style={{ color: 'rgba(59,130,246,0.85)' }} />
          <span className="font-bold text-base" style={{ color: 'rgba(30,10,10,0.9)' }}>Расписание на сегодня</span>
        </div>
        <div className="space-y-2">
          {schedule.slice(0, 3).map((lesson, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              <span className="text-xs font-mono font-bold" style={{ color: 'rgba(59,130,246,0.9)', minWidth: 40 }}>
                {lesson.time}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: 'rgba(30,10,10,0.9)' }}>{lesson.subject}</div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.45)' }}>
                  {lesson.teacher} · Каб. {lesson.room}
                </div>
              </div>
              {lesson.isChanged && (
                <span style={{
                  background: 'rgba(234,179,8,0.2)',
                  border: '1px solid rgba(234,179,8,0.4)',
                  color: 'rgba(161,120,0,0.95)',
                  borderRadius: 8,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                }}>Изменено</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DiaryContent;
