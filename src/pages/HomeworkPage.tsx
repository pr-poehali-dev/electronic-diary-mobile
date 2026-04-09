import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const glass = {
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(32px) saturate(2)',
  WebkitBackdropFilter: 'blur(32px) saturate(2)',
  borderRadius: 22,
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 4px 28px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.45) inset',
};

type HW = {
  subject: string;
  icon: string;
  task: string;
  details?: string;
  due: string;
  dueLabel: string;
  done: boolean;
};

const HOMEWORK: HW[] = [
  // 30.09 (самые новые)
  { subject: 'Алгебра',         icon: '📐', task: '§14, задачи №320–328 (нечётные)', details: 'Логарифмы, свойства', due: '30.09', dueLabel: '30 сентября', done: false },
  { subject: 'Русский язык',    icon: '📝', task: 'Упр. 184 — написать сочинение-рассуждение', details: '200–250 слов, по плану', due: '30.09', dueLabel: '30 сентября', done: false },
  { subject: 'История',         icon: '🏛️', task: 'Прочитать §20–21, составить хронологическую таблицу', due: '30.09', dueLabel: '30 сентября', done: false },
  // 29.09
  { subject: 'Физика',          icon: '⚡', task: '§18: задачи №456, 458, 462', details: 'Электромагнитная индукция', due: '29.09', dueLabel: '29 сентября', done: false },
  { subject: 'Английский язык', icon: '🌍', task: 'WB p.42 ex.3–5 + выучить слова Unit 6 (20 слов)', due: '29.09', dueLabel: '29 сентября', done: false },
  { subject: 'Биология',        icon: '🌿', task: 'Параграф 18 — строение клетки, ответить на вопросы 1–6', details: 'Нарисовать схему клетки', due: '29.09', dueLabel: '29 сентября', done: true },
  // 28.09
  { subject: 'Литература',      icon: '📖', task: 'Дочитать «Война и мир» т.2, ч.2, гл.12–18', details: 'Выписать цитаты Наташи Ростовой', due: '28.09', dueLabel: '28 сентября', done: true },
  { subject: 'Химия',           icon: '🧪', task: 'Составить уравнения реакций окисления: задачи 3, 5, 8', details: 'Стр. 45–46 сборника', due: '28.09', dueLabel: '28 сентября', done: false },
  { subject: 'Обществознание',  icon: '🏛️', task: 'Параграф 12 — права гражданина, подготовить устный ответ', due: '28.09', dueLabel: '28 сентября', done: true },
  // 27.09
  { subject: 'Геометрия',       icon: '📏', task: '§9: теорема Пифагора — доказательство + задачи 245–248', due: '27.09', dueLabel: '27 сентября', done: true },
  { subject: 'Информатика',     icon: '💻', task: 'Написать программу сортировки массива на Python', details: 'Метод пузырька, с комментариями', due: '27.09', dueLabel: '27 сентября', done: true },
  { subject: 'География',       icon: '🌐', task: 'Нанести на контурную карту экономические районы России', details: 'Учебник стр. 88–92', due: '27.09', dueLabel: '27 сентября', done: true },
  // 26.09
  { subject: 'Физика',          icon: '⚡', task: 'Повторить §14–17 к контрольной работе', details: 'Формулы, законы, примеры задач', due: '26.09', dueLabel: '26 сентября', done: true },
  { subject: 'Русский язык',    icon: '📝', task: 'Выучить правила §22–24 (причастия и деепричастия)', due: '26.09', dueLabel: '26 сентября', done: true },
  { subject: 'Английский язык', icon: '🌍', task: 'Написать эссе "My future profession" (150 слов)', due: '26.09', dueLabel: '26 сентября', done: true },
];

const HomeworkPage: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(HOMEWORK.map((hw, i) => [i, hw.done]))
  );

  const toggle = (idx: number) => setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));

  // Группировка по датам
  const dates = [...new Set(HOMEWORK.map(hw => hw.due))];
  const grouped = dates.map(due => ({
    due,
    dueLabel: HOMEWORK.find(h => h.due === due)!.dueLabel,
    items: HOMEWORK.map((hw, i) => ({ ...hw, idx: i })).filter(hw => hw.due === due),
  }));

  const totalDone = Object.values(checked).filter(Boolean).length;
  const total = HOMEWORK.length;

  const subjectColor: Record<string, { dot: string }> = {
    'Алгебра':         { dot: '#9333ea' },
    'Геометрия':       { dot: '#9333ea' },
    'Русский язык':    { dot: '#E8000E' },
    'Литература':      { dot: '#ec4899' },
    'Английский язык': { dot: '#3b82f6' },
    'История':         { dot: '#F5C800' },
    'Обществознание':  { dot: '#f43f5e' },
    'Физика':          { dot: '#f97316' },
    'Химия':           { dot: '#10b981' },
    'Биология':        { dot: '#22c55e' },
    'География':       { dot: '#14b8a6' },
    'Информатика':     { dot: '#6366f1' },
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-md mx-auto bg-card min-h-screen">
        <div className="p-4 space-y-3 pb-8">

          {/* Шапка */}
          <div style={{
            borderRadius: 22,
            overflow: 'hidden',
            position: 'relative',
            background: '#E8000E',
            boxShadow: '0 6px 32px rgba(232,0,14,0.4)',
            padding: '16px 18px',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -20, width: 130, height: 240, background: '#F5C800', transform: 'rotate(-18deg)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: -30, right: -52, width: 130, height: 240, background: '#0D1B4B', transform: 'rotate(-18deg)', zIndex: 0 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => navigate('/')}
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>10А класс</p>
                <h1 style={{ color: 'white', fontSize: 20, fontWeight: 900, lineHeight: 1.1 }}>Домашние задания</h1>
              </div>
              <div style={{ marginLeft: 'auto', background: '#F5C800', borderRadius: 14, padding: '6px 14px', textAlign: 'center', boxShadow: '0 3px 12px rgba(245,200,0,0.4)' }}>
                <div style={{ color: '#0D1B4B', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>{totalDone}/{total}</div>
                <div style={{ color: 'rgba(13,27,75,0.6)', fontSize: 10, fontWeight: 700 }}>выполнено</div>
              </div>
            </div>
          </div>

          {/* Прогресс-бар */}
          <div style={{ ...glass, padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#0D1B4B' }}>Прогресс за период</span>
              <span style={{ fontWeight: 800, fontSize: 13, color: '#E8000E' }}>{Math.round(totalDone / total * 100)}%</span>
            </div>
            <div style={{ height: 8, background: 'rgba(13,27,75,0.1)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${totalDone / total * 100}%`,
                background: 'linear-gradient(90deg, #E8000E, #F5C800)',
                borderRadius: 6,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>

          {/* Список по датам */}
          {grouped.map(group => (
            <div key={group.due}>
              {/* Дата-разделитель */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, marginTop: 4 }}>
                <div style={{ height: 1, flex: 1, background: 'rgba(13,27,75,0.1)' }} />
                <div style={{
                  background: '#0D1B4B',
                  borderRadius: 10,
                  padding: '3px 12px',
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#F5C800',
                  letterSpacing: '0.05em',
                }}>
                  {group.dueLabel}
                </div>
                <div style={{ height: 1, flex: 1, background: 'rgba(13,27,75,0.1)' }} />
              </div>

              <div className="space-y-2">
                {group.items.map((hw) => {
                  const isDone = checked[hw.idx];
                  const dot = subjectColor[hw.subject]?.dot ?? '#888';
                  return (
                    <div
                      key={hw.idx}
                      style={{
                        ...glass,
                        padding: '14px',
                        opacity: isDone ? 0.65 : 1,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        {/* Чекбокс */}
                        <button
                          onClick={() => toggle(hw.idx)}
                          style={{
                            width: 26, height: 26,
                            borderRadius: 8,
                            border: `2.5px solid ${isDone ? '#E8000E' : 'rgba(13,27,75,0.25)'}`,
                            background: isDone ? '#E8000E' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: 1,
                            transition: 'all 0.18s',
                            cursor: 'pointer',
                          }}
                        >
                          {isDone && <Icon name="Check" size={14} style={{ color: '#fff' }} />}
                        </button>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Предмет */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <span style={{ fontSize: 16 }}>{hw.icon}</span>
                            <span style={{ fontWeight: 800, fontSize: 13, color: '#0D1B4B' }}>{hw.subject}</span>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                          </div>

                          {/* Задание */}
                          <p style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: isDone ? 'rgba(13,27,75,0.45)' : 'rgba(13,27,75,0.85)',
                            textDecoration: isDone ? 'line-through' : 'none',
                            lineHeight: 1.4,
                            marginBottom: hw.details ? 4 : 0,
                          }}>
                            {hw.task}
                          </p>

                          {/* Подробности */}
                          {hw.details && (
                            <p style={{ fontSize: 11, color: 'rgba(13,27,75,0.45)', lineHeight: 1.35 }}>
                              {hw.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Футер */}
          <div style={{
            background: '#0D1B4B',
            borderRadius: 18,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(13,27,75,0.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
              <Icon name="BookMarked" size={14} />
              Сентябрь 2025
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
              Выполнено: <span style={{ color: '#F5C800', fontWeight: 900 }}>{totalDone} из {total}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;
