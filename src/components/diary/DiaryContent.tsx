import React from 'react';
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
    avg?: number;
  }>;
}

const glass = {
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(32px) saturate(2)',
  WebkitBackdropFilter: 'blur(32px) saturate(2)',
  borderRadius: 22,
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 4px 28px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.45) inset',
};

const DiaryContent: React.FC<DiaryContentProps> = ({ schedule, grades }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Hero-карточка с молнией */}
      <div style={{
        borderRadius: 26,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 200,
        background: '#E8000E',
        boxShadow: '0 8px 40px rgba(232,0,14,0.45)',
      }}>
        {/* Жёлтая диагональная полоса-молния */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -10,
          width: 170,
          height: 310,
          background: '#F5C800',
          transform: 'rotate(-18deg)',
          zIndex: 1,
        }} />
        {/* Тёмно-синяя тень молнии */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -46,
          width: 170,
          height: 310,
          background: '#0D1B4B',
          transform: 'rotate(-18deg)',
          zIndex: 0,
        }} />

        {/* Нижняя жёлтая полоска */}
        <div style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 180,
          height: 80,
          background: '#F5C800',
          transform: 'rotate(-18deg)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          left: -55,
          width: 180,
          height: 80,
          background: '#0D1B4B',
          transform: 'rotate(-18deg)',
          zIndex: 0,
        }} />

        {/* Текст поверх */}
        <div style={{ position: 'relative', zIndex: 2, padding: '24px 22px' }}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Сентябрь 2025
          </p>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 900, lineHeight: 1, marginBottom: 2, textShadow: '0 2px 12px rgba(0,0,0,0.25)', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Четверг
          </h1>
          <h2 style={{ color: 'rgba(255,255,255,0.9)', fontSize: 26, fontWeight: 700 }}>
            25 / 09
          </h2>
          <div style={{
            marginTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 12,
            padding: '6px 14px',
          }}>
            <Icon name="Zap" size={14} style={{ color: '#F5C800' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>7 уроков · Дневник</span>
          </div>
        </div>
      </div>

      {/* Блок быстрых действий */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{
          ...glass,
          padding: '16px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(232,0,14,0.15) 0%, rgba(232,0,14,0.06) 100%)',
          border: '1.5px solid rgba(232,0,14,0.25)',
        }} onClick={() => navigate('/grades')}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#E8000E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 10,
            boxShadow: '0 4px 14px rgba(232,0,14,0.4)',
          }}>
            <Icon name="BookOpen" size={20} style={{ color: '#fff' }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, color: '#0D1B4B' }}>Оценки</div>
          <div style={{ fontSize: 11, color: 'rgba(13,27,75,0.5)', marginTop: 2 }}>Журнал класса</div>
        </div>

        <div style={{
          ...glass,
          padding: '16px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(245,200,0,0.2) 0%, rgba(245,200,0,0.07) 100%)',
          border: '1.5px solid rgba(245,200,0,0.35)',
        }} onClick={() => navigate('/homework')}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#F5C800',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 10,
            boxShadow: '0 4px 14px rgba(245,200,0,0.45)',
          }}>
            <Icon name="BookMarked" size={20} style={{ color: '#0D1B4B' }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, color: '#0D1B4B' }}>Домашние</div>
          <div style={{ fontSize: 11, color: 'rgba(13,27,75,0.5)', marginTop: 2 }}>Задания класса</div>
        </div>
      </div>

      {/* Последние оценки */}
      <div style={{ ...glass, padding: '18px', cursor: 'pointer' }} onClick={() => navigate('/grades')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: '#E8000E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 10px rgba(232,0,14,0.35)',
          }}>
            <Icon name="TrendingUp" size={16} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#0D1B4B', fontFamily: "'Playfair Display', Georgia, serif" }}>Последние оценки</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: 'rgba(13,27,75,0.4)', fontWeight: 600 }}>Все</span>
            <Icon name="ChevronRight" size={16} style={{ color: 'rgba(13,27,75,0.35)' }} />
          </div>
        </div>
        <div className="space-y-2">
          {grades.map((grade, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.35)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#0D1B4B' }}>{grade.subject}</span>
                  {grade.avg !== undefined && (
                    <span style={{ fontSize: 11, color: 'rgba(13,27,75,0.4)', fontWeight: 500 }}>({grade.avg})</span>
                  )}
                </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: 'rgba(13,27,75,0.4)' }}>{grade.date}</span>
                <div style={{
                  width: 34, height: 34,
                  borderRadius: 10,
                  background: grade.grade === 5 ? 'rgba(34,197,94,0.15)' : grade.grade === 4 ? 'rgba(245,200,0,0.2)' : 'rgba(232,0,14,0.15)',
                  border: `2px solid ${grade.grade === 5 ? 'rgba(34,197,94,0.5)' : grade.grade === 4 ? 'rgba(245,200,0,0.6)' : 'rgba(232,0,14,0.4)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 16,
                  color: grade.grade === 5 ? '#16a34a' : grade.grade === 4 ? '#92700a' : '#E8000E',
                }}>
                  {grade.grade}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Расписание */}
      <div style={{ ...glass, padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: '#0D1B4B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 10px rgba(13,27,75,0.35)',
          }}>
            <Icon name="Clock" size={16} style={{ color: '#F5C800' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#0D1B4B' }}>Расписание на сегодня</span>
        </div>
        <div className="space-y-2">
          {schedule.slice(0, 4).map((lesson, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.35)',
            }}>
              <div style={{
                minWidth: 46, height: 34, borderRadius: 10,
                background: '#0D1B4B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#F5C800', fontFamily: 'monospace' }}>{lesson.time}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0D1B4B' }}>{lesson.subject}</div>
                <div style={{ fontSize: 11, color: 'rgba(13,27,75,0.45)', marginTop: 1 }}>
                  {lesson.teacher} · Каб. {lesson.room}
                </div>
              </div>
              {lesson.isChanged && (
                <span style={{
                  background: 'rgba(245,200,0,0.2)',
                  border: '1.5px solid rgba(245,200,0,0.5)',
                  color: '#92700a',
                  borderRadius: 8,
                  padding: '3px 9px',
                  fontSize: 10,
                  fontWeight: 700,
                }}>Изменено</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Подпись проекта */}
      <div style={{
        textAlign: 'center',
        padding: '16px 8px 4px',
      }}>
        <p style={{
          fontSize: 11,
          color: 'rgba(13,27,75,0.4)',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}>
          Продукт проекта «Как дизайн организует внимание»<br />
          ученика 10 «А» класса ГБОУ школы № 630<br />
          <span style={{ fontWeight: 700, color: 'rgba(13,27,75,0.55)' }}>Дрёмова Александра</span>
        </p>
      </div>

    </div>
  );
};

export default DiaryContent;