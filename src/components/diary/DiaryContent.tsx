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

      {/* === HERO BANNER === */}
      <div className="poster-card-red relative overflow-hidden diagonal-accent" style={{ minHeight: 260 }}>
        <div className="poster-stripe" />

        {/* Декоративный жёлтый блок */}
        <div className="absolute top-0 right-0 w-20 h-full bg-diary-yellow opacity-80"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} />
        <div className="absolute top-0 right-16 w-8 h-full bg-[#1a1235] opacity-50"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} />

        <div className="relative z-10 p-5 pb-8">
          <div className="inline-block bg-[#1a1235] text-diary-yellow px-3 py-0.5 mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Электронный дневник
          </div>
          <h1 className="poster-title text-white" style={{ fontSize: 48, lineHeight: 1 }}>
            Суббота
          </h1>
          <h2 className="poster-title text-diary-yellow" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 4 }}>
            29 / 09
          </h2>
          <div className="mt-4 flex gap-3 items-end">
            <div>
              <div className="poster-title text-white" style={{ fontSize: 22 }}>Дневник</div>
              <div className="text-white/80 font-semibold text-sm mt-1">7 уроков · Сентябрь 2025</div>
            </div>
          </div>
        </div>

        {/* Нижняя граница */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-diary-yellow" />
      </div>

      {/* === ОЦЕНКИ === */}
      <div
        className="poster-card cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
        style={{ transition: 'box-shadow 0.15s, transform 0.15s' }}
        onClick={() => navigate('/grades')}
      >
        <div className="bg-[#1a1235] px-4 py-2 flex items-center justify-between">
          <span className="poster-title text-diary-yellow" style={{ fontSize: 16 }}>
            Последние оценки
          </span>
          <Icon name="ChevronRight" size={18} className="text-diary-yellow" />
        </div>
        <div className="p-3 space-y-2">
          {grades.map((grade, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <span className="font-semibold text-[#1a1235] text-sm">{grade.subject}</span>
              <div className="flex items-center gap-2">
                <span
                  className="poster-badge text-xs"
                  style={{
                    color: grade.grade >= 4 ? '#1a1235' : '#DC2626',
                    borderColor: grade.grade >= 4 ? '#1a1235' : '#DC2626',
                    background: grade.grade >= 4 ? '#EAB308' : 'transparent',
                  }}
                >
                  {grade.grade}
                </span>
                <span className="text-xs text-gray-400">{grade.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === РАСПИСАНИЕ === */}
      <div className="poster-card">
        <div className="bg-diary-yellow px-4 py-2 flex items-center gap-2" style={{ borderBottom: '3px solid #1a1235' }}>
          <Icon name="Clock" size={16} className="text-[#1a1235]" />
          <span className="poster-title text-[#1a1235]" style={{ fontSize: 16 }}>
            Расписание на сегодня
          </span>
        </div>
        <div className="p-3 space-y-2">
          {schedule.slice(0, 3).map((lesson, idx) => (
            <div key={idx} className="flex items-center gap-3 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <div className="text-xs font-mono font-black text-[#1a1235] bg-gray-100 px-2 py-1 min-w-[52px] text-center" style={{ border: '2px solid #1a1235' }}>
                {lesson.time}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-[#1a1235]">{lesson.subject}</div>
                <div className="text-xs text-gray-500">{lesson.teacher} · каб. {lesson.room}</div>
              </div>
              {lesson.isChanged && (
                <span className="poster-badge text-[10px] bg-diary-yellow text-[#1a1235] border-[#1a1235]">
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
