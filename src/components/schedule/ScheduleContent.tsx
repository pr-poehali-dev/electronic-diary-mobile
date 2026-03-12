import React from 'react';
import Icon from '@/components/ui/icon';

interface ScheduleContentProps {
  schedule: unknown[];
}

const ScheduleContent: React.FC<ScheduleContentProps> = () => {
  const weekSchedule = {
    times: ['8:00', '8:55', '9:50', '10:55', '11:50', '12:45', '13:40'],
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
    lessons: [
      [
        { subject: 'Русский язык', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Алгебра', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'ОБЖ', teacher: 'Лопин С.А.', room: '320' },
        { subject: 'Статистика', teacher: 'Туктарова Н.Ф.', room: '301' }
      ],
      [
        { subject: 'Английский', teacher: 'Бычкина М.В.', room: '109' },
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Биология', teacher: 'Мух Б.К.', room: '329' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Лит. мастерская', teacher: 'Пищур С.А.', room: '205' }
      ],
      [
        { subject: 'Английский', teacher: 'Бычкина М.В.', room: '109' },
        { subject: 'Английский', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Английский', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'Зал' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' }
      ],
      [
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Изб. математика', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'История', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Русский язык', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Алгебра', teacher: 'Туктарова Н.Ф.', room: '301' }
      ],
      [
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Геометрия', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'География', teacher: 'Кинженко Е.Н.', room: '233' },
        { subject: 'История', teacher: 'Акользина А.В.', room: '416' }
      ],
      [
        { subject: 'Инд. проект', teacher: 'Вахнер Е.И.', room: '105' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'С3' },
        { subject: 'Физика', teacher: 'Вишнева О.А.', room: '322' },
        { subject: 'Английский', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'С3' }
      ],
      [
        { subject: 'Русский язык', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Физика', teacher: 'Вишнева О.А.', room: '322' },
        { subject: 'Информатика', teacher: 'Рогова И.Р.', room: '102' },
        { subject: 'Химия', teacher: 'Новикова А.Е.', room: '412' },
        { subject: 'Геометрия', teacher: 'Туктарова Н.Ф.', room: '301' }
      ]
    ]
  };

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Hero */}
      <div className="glass-red p-5">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={20} className="text-white/80" />
          <h2 className="text-xl font-bold text-white">Расписание 10А</h2>
        </div>
      </div>

      {/* Таблица */}
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-2 text-center font-bold text-white/50 min-w-[44px]"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  ⏰
                </th>
                {weekSchedule.days.map((day, idx) => (
                  <th key={idx} className="p-2 text-center font-bold text-white/80 min-w-[100px]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekSchedule.times.map((time, timeIdx) => (
                <tr key={timeIdx}>
                  <td className="p-2 text-center font-mono font-bold text-white/40"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {time}
                  </td>
                  {weekSchedule.lessons[timeIdx].map((lesson, dayIdx) => (
                    <td key={dayIdx} className="p-2 text-center align-top"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="font-semibold text-white/90 leading-tight mb-0.5">
                        {lesson.subject}
                      </div>
                      <div className="text-white/40 text-[10px]">
                        каб. {lesson.room}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ScheduleContent;