import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import useClickSound from '@/hooks/use-click-sound';

const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

const TIMES = ['8:00', '8:55', '9:50', '10:55', '11:50', '12:45', '13:40'];

const WEEK_LESSONS = [
  // Понедельник
  [
    { subject: 'Русский язык',    teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'Английский язык', teacher: 'Громова Т.С.',      room: '109' },
    { subject: 'Английский язык', teacher: 'Громова Т.С.',      room: '109' },
    { subject: 'Обществознание',  teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Обществознание',  teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Инд. проект',     teacher: 'Вайнер Е.И.',       room: '105' },
    { subject: 'Русский язык',    teacher: 'Пищур С.А.',        room: '205' },
  ],
  // Вторник
  [
    { subject: 'Обществознание',  teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Обществознание',  teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Английский язык', teacher: 'Громова Т.С.',      room: '308' },
    { subject: 'Изб. вопросы мат.',teacher: 'Серова Н.Ф.',     room: '301' },
    { subject: 'Геометрия',       teacher: 'Серова Н.Ф.',       room: '301' },
    { subject: 'Физкультура',     teacher: 'Мельников О.П.',    room: 'С3'  },
    { subject: 'Физика',          teacher: 'Денисова О.А.',      room: '322' },
  ],
  // Среда
  [
    { subject: 'Алгебра',         teacher: 'Серова Н.Ф.',       room: '301' },
    { subject: 'Биология',        teacher: 'Фролов Б.К.',        room: '329' },
    { subject: 'Английский язык', teacher: 'Громова Т.С.',      room: '308' },
    { subject: 'История',         teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Литература',      teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'Физика',          teacher: 'Денисова О.А.',      room: '322' },
    { subject: 'Информатика',     teacher: 'Коршиков В.Ю.',      room: '102' },
  ],
  // Четверг
  [
    { subject: 'ОБЖ',             teacher: 'Кравцов С.А.',       room: '320' },
    { subject: 'Литература',      teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'Физкультура',     teacher: 'Мельников О.П.',    room: 'Спортзал' },
    { subject: 'Русский язык',    teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'География',       teacher: 'Белякова Е.Н.',     room: '233' },
    { subject: 'Английский язык', teacher: 'Громова Т.С.',      room: '308' },
    { subject: 'Химия',           teacher: 'Романова А.Е.',      room: '412' },
  ],
  // Пятница
  [
    { subject: 'Вер. и стат.',    teacher: 'Серова Н.Ф.',       room: '301' },
    { subject: 'Лит. мастерская', teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'Литература',      teacher: 'Пищур С.А.',        room: '205' },
    { subject: 'Алгебра',         teacher: 'Серова Н.Ф.',       room: '301' },
    { subject: 'История',         teacher: 'Зорина А.В.',       room: '416' },
    { subject: 'Физкультура',     teacher: 'Мельников О.П.',    room: 'С3'  },
    { subject: 'Геометрия',       teacher: 'Серова Н.Ф.',       room: '301' },
  ],
];

// Яркие цвета для уроков (по предмету)
const SUBJECT_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  'Русский язык':    { bg: 'rgba(239,68,68,0.18)',   border: 'rgba(239,68,68,0.4)',   icon: '📝' },
  'Английский язык': { bg: 'rgba(59,130,246,0.18)',  border: 'rgba(59,130,246,0.4)',  icon: '🌍' },
  'Алгебра':         { bg: 'rgba(168,85,247,0.18)',  border: 'rgba(168,85,247,0.4)',  icon: '📐' },
  'Геометрия':       { bg: 'rgba(168,85,247,0.18)',  border: 'rgba(168,85,247,0.4)',  icon: '📏' },
  'Физика':          { bg: 'rgba(251,146,60,0.18)',  border: 'rgba(251,146,60,0.4)',  icon: '⚡' },
  'Химия':           { bg: 'rgba(52,211,153,0.18)',  border: 'rgba(52,211,153,0.4)',  icon: '🧪' },
  'Биология':        { bg: 'rgba(34,197,94,0.18)',   border: 'rgba(34,197,94,0.4)',   icon: '🌿' },
  'История':         { bg: 'rgba(251,191,36,0.18)',  border: 'rgba(251,191,36,0.4)',  icon: '🏛️' },
  'Обществознание':  { bg: 'rgba(244,63,94,0.18)',   border: 'rgba(244,63,94,0.4)',   icon: '🏛️' },
  'Литература':      { bg: 'rgba(236,72,153,0.18)',  border: 'rgba(236,72,153,0.4)',  icon: '📖' },
  'Физкультура':     { bg: 'rgba(14,165,233,0.18)',  border: 'rgba(14,165,233,0.4)',  icon: '🏃' },
  'Информатика':     { bg: 'rgba(99,102,241,0.18)',  border: 'rgba(99,102,241,0.4)',  icon: '💻' },
  'ОБЖ':             { bg: 'rgba(234,88,12,0.18)',   border: 'rgba(234,88,12,0.4)',   icon: '🛡️' },
  'География':       { bg: 'rgba(16,185,129,0.18)',  border: 'rgba(16,185,129,0.4)',  icon: '🌐' },
  'Инд. проект':     { bg: 'rgba(139,92,246,0.18)',  border: 'rgba(139,92,246,0.4)',  icon: '💡' },
};

const getColor = (subject: string) =>
  SUBJECT_COLORS[subject] ?? { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.25)', icon: '📚' };

const today = new Date().getDay(); // 0=Sun, 1=Mon ... 5=Fri, 6=Sat
const initialDay = today >= 1 && today <= 5 ? today - 1 : 0;

const ScheduleContent: React.FC = () => {
  const [dayIdx, setDayIdx] = useState(initialDay);
  const playClick = useClickSound();

  const prev = () => { playClick(); setDayIdx(i => (i - 1 + 5) % 5); };
  const next = () => { playClick(); setDayIdx(i => (i + 1) % 5); };

  const lessons = WEEK_LESSONS[dayIdx];

  return (
    <div className="space-y-3 animate-fade-in pb-2">

      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
        padding: '14px 16px',
      }}>
        <p className="text-center text-xs font-medium" style={{ color: 'rgba(220,38,38,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          10А класс
        </p>
        <h2 className="text-center text-lg font-bold mt-0.5" style={{ color: 'rgba(30,10,10,0.9)' }}>
          Расписание уроков
        </h2>
      </div>

      {/* Day switcher */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button
          onClick={prev}
          style={{
            background: 'rgba(220,38,38,0.12)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 12,
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#dc2626',
            transition: 'all 0.18s',
          }}
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#dc2626' }}>{DAYS[dayIdx]}</div>
          <div className="flex gap-1 justify-center mt-1">
            {DAYS.map((_, i) => (
              <div key={i} style={{
                width: i === dayIdx ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === dayIdx ? '#dc2626' : 'rgba(220,38,38,0.25)',
                transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            ))}
          </div>
        </div>

        <button
          onClick={next}
          style={{
            background: 'rgba(220,38,38,0.12)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 12,
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#dc2626',
            transition: 'all 0.18s',
          }}
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      {/* Lessons */}
      <div className="space-y-2">
        {lessons.map((lesson, idx) => {
          const color = getColor(lesson.subject);
          return (
            <div
              key={idx}
              style={{
                background: color.bg,
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                borderRadius: 16,
                border: `1px solid ${color.border}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.35) inset',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {/* Lesson number + time */}
              <div style={{ minWidth: 48, textAlign: 'center' }}>
                <div style={{
                  background: color.border,
                  borderRadius: 10,
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 4px',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.95)',
                }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(30,10,10,0.5)', fontWeight: 500 }}>{TIMES[idx]}</div>
              </div>

              {/* Emoji */}
              <div style={{ fontSize: 24 }}>{color.icon}</div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(20,5,5,0.9)', lineHeight: 1.2 }}>
                  {lesson.subject}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(30,10,10,0.55)', marginTop: 2 }}>
                  {lesson.teacher}
                </div>
              </div>

              {/* Room */}
              <div style={{
                background: 'rgba(255,255,255,0.35)',
                borderRadius: 10,
                padding: '4px 8px',
                fontSize: 12,
                fontWeight: 700,
                color: 'rgba(20,5,5,0.75)',
                whiteSpace: 'nowrap',
              }}>
                {lesson.room}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleContent;