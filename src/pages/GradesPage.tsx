import React from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const GradesPage: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'Алгебра',
      teacher: 'Серова Н.Ф.',
      icon: '📐',
      grades: [
        { value: 5, date: '02.09', type: 'Контр.' },
        { value: 4, date: '09.09', type: 'Тест' },
        { value: 5, date: '16.09', type: 'Д/з' },
        { value: 5, date: '23.09', type: 'Раб.' },
        { value: 4, date: '26.09', type: 'Тест' },
      ]
    },
    {
      name: 'Геометрия',
      teacher: 'Серова Н.Ф.',
      icon: '📏',
      grades: [
        { value: 5, date: '03.09', type: 'Контр.' },
        { value: 5, date: '10.09', type: 'Раб.' },
        { value: 4, date: '17.09', type: 'Д/з' },
        { value: 5, date: '24.09', type: 'Тест' },
      ]
    },
    {
      name: 'Русский язык',
      teacher: 'Пищур С.А.',
      icon: '📝',
      grades: [
        { value: 5, date: '01.09', type: 'Диктант' },
        { value: 4, date: '08.09', type: 'Соч.' },
        { value: 5, date: '15.09', type: 'Тест' },
        { value: 5, date: '22.09', type: 'Раб.' },
        { value: 4, date: '25.09', type: 'Д/з' },
      ]
    },
    {
      name: 'Литература',
      teacher: 'Пищур С.А.',
      icon: '📖',
      grades: [
        { value: 5, date: '04.09', type: 'Соч.' },
        { value: 5, date: '11.09', type: 'Чтение' },
        { value: 5, date: '18.09', type: 'Анализ' },
        { value: 4, date: '25.09', type: 'Д/з' },
      ]
    },
    {
      name: 'Английский язык',
      teacher: 'Громова Т.С.',
      icon: '🌍',
      grades: [
        { value: 5, date: '02.09', type: 'Устный' },
        { value: 4, date: '09.09', type: 'Грамм.' },
        { value: 5, date: '16.09', type: 'Слова' },
        { value: 5, date: '23.09', type: 'Аудир.' },
        { value: 5, date: '26.09', type: 'Тест' },
      ]
    },
    {
      name: 'История',
      teacher: 'Зорина А.В.',
      icon: '🏛️',
      grades: [
        { value: 5, date: '03.09', type: 'Тест' },
        { value: 5, date: '10.09', type: 'Презент.' },
        { value: 4, date: '17.09', type: 'Д/з' },
        { value: 5, date: '24.09', type: 'Соч.' },
      ]
    },
    {
      name: 'Обществознание',
      teacher: 'Зорина А.В.',
      icon: '🏛️',
      grades: [
        { value: 5, date: '05.09', type: 'Тест' },
        { value: 4, date: '12.09', type: 'Раб.' },
        { value: 5, date: '19.09', type: 'Проект' },
        { value: 5, date: '26.09', type: 'Д/з' },
      ]
    },
    {
      name: 'Физика',
      teacher: 'Денисова О.А.',
      icon: '⚡',
      grades: [
        { value: 5, date: '06.09', type: 'Лаб.' },
        { value: 4, date: '13.09', type: 'Тест' },
        { value: 5, date: '20.09', type: 'Задача' },
        { value: 5, date: '27.09', type: 'Раб.' },
      ]
    },
    {
      name: 'Химия',
      teacher: 'Романова А.Е.',
      icon: '🧪',
      grades: [
        { value: 5, date: '04.09', type: 'Лаб.' },
        { value: 5, date: '11.09', type: 'Тест' },
        { value: 4, date: '18.09', type: 'Д/з' },
        { value: 5, date: '25.09', type: 'Контр.' },
      ]
    },
    {
      name: 'Биология',
      teacher: 'Фролов Б.К.',
      icon: '🌿',
      grades: [
        { value: 5, date: '07.09', type: 'Тест' },
        { value: 5, date: '14.09', type: 'Лаб.' },
        { value: 5, date: '21.09', type: 'Раб.' },
        { value: 4, date: '28.09', type: 'Д/з' },
      ]
    },
    {
      name: 'География',
      teacher: 'Белякова Е.Н.',
      icon: '🌐',
      grades: [
        { value: 5, date: '05.09', type: 'Карта' },
        { value: 4, date: '12.09', type: 'Тест' },
        { value: 5, date: '19.09', type: 'Презент.' },
        { value: 5, date: '26.09', type: 'Д/з' },
      ]
    },
    {
      name: 'Информатика',
      teacher: 'Коршиков В.Ю.',
      icon: '💻',
      grades: [
        { value: 5, date: '08.09', type: 'Прогр.' },
        { value: 5, date: '15.09', type: 'Тест' },
        { value: 5, date: '22.09', type: 'Проект' },
        { value: 5, date: '29.09', type: 'Раб.' },
      ]
    },
  ];

  const calculateAverage = (grades: { value: number }[]) => {
    const sum = grades.reduce((acc, g) => acc + g.value, 0);
    return (sum / grades.length).toFixed(1);
  };

  const overallAverage = () => {
    const all = subjects.flatMap(s => s.grades);
    const sum = all.reduce((acc, g) => acc + g.value, 0);
    return (sum / all.length).toFixed(2);
  };

  const getGradeStyle = (value: number) => {
    if (value === 5) return { bg: 'rgba(34,197,94,0.2)', border: 'rgba(34,197,94,0.5)', color: 'rgba(21,128,61,0.95)' };
    if (value === 4) return { bg: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.5)', color: 'rgba(29,78,216,0.95)' };
    if (value === 3) return { bg: 'rgba(234,179,8,0.2)', border: 'rgba(234,179,8,0.5)', color: 'rgba(161,120,0,0.95)' };
    return { bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)', color: 'rgba(185,28,28,0.95)' };
  };

  const getAvgColor = (avg: string) => {
    const v = parseFloat(avg);
    if (v >= 4.5) return '#16a34a';
    if (v >= 3.5) return '#2563eb';
    if (v >= 2.5) return '#ca8a04';
    return '#dc2626';
  };

  const glass = {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(32px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.25)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-md mx-auto bg-card min-h-screen">
        <div className="p-4 space-y-3 pb-8">

          {/* Шапка */}
          <div style={{
            ...glass,
            background: 'linear-gradient(135deg, rgba(220,38,38,0.72) 0%, rgba(239,68,68,0.55) 100%)',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '14px 16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -20, right: -20,
              width: 100, height: 100, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 12,
                  width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  10А класс
                </p>
                <h1 style={{ color: 'white', fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>
                  Журнал оценок
                </h1>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 14,
                padding: '6px 14px',
                textAlign: 'center',
              }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{overallAverage()}</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 500 }}>ср. балл</div>
              </div>
            </div>
          </div>

          {/* Карточки предметов */}
          {subjects.map((subject, idx) => {
            const avg = calculateAverage(subject.grades);
            return (
              <div key={idx} style={{ ...glass, padding: '14px' }}>
                {/* Заголовок предмета */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0,
                    }}>
                      {subject.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'rgba(30,10,10,0.9)' }}>{subject.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginTop: 1 }}>{subject.teacher}</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.3)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: 12,
                    padding: '4px 12px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: getAvgColor(avg), lineHeight: 1 }}>{avg}</div>
                    <div style={{ fontSize: 9, color: 'rgba(30,10,10,0.4)', fontWeight: 500 }}>средний</div>
                  </div>
                </div>

                {/* Оценки */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {subject.grades.map((grade, gIdx) => {
                    const gs = getGradeStyle(grade.value);
                    return (
                      <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <div style={{
                          width: 44, height: 44,
                          borderRadius: 12,
                          background: gs.bg,
                          border: `2px solid ${gs.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 800, fontSize: 18,
                          color: gs.color,
                          backdropFilter: 'blur(8px)',
                        }}>
                          {grade.value}
                        </div>
                        <div style={{ fontSize: 9, color: 'rgba(30,10,10,0.4)', fontWeight: 500 }}>{grade.date}</div>
                        <div style={{ fontSize: 9, color: 'rgba(30,10,10,0.3)' }}>{grade.type}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Футер */}
          <div style={{
            ...glass,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(30,10,10,0.5)', fontSize: 12 }}>
              <Icon name="Calendar" size={14} />
              Сентябрь 2025
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'rgba(30,10,10,0.7)' }}>
              Общий средний: <span style={{ color: '#16a34a' }}>{overallAverage()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GradesPage;
