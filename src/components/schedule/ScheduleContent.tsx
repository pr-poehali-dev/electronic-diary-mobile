import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ScheduleLesson {
  subject: string;
  teacher: string;
  room: string;
}

interface ScheduleContentProps {
  schedule: any[];
}

const ScheduleContent: React.FC<ScheduleContentProps> = () => {
  const weekSchedule = {
    times: ['8:00-8:45', '8:55-9:40', '9:50-10:35', '10:55-11:40', '11:50-12:35', '12:45-13:30', '13:40-14:25'],
    days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
    lessons: [
      // 1 урок 8:00-8:45
      [
        { subject: 'Русский язык', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Алгебра и начала мат. анализа', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'ОБЖ', teacher: 'Лопин С.А.', room: '320' },
        { subject: 'Вероятность и статистика', teacher: 'Туктарова Н.Ф.', room: '301' }
      ],
      // 2 урок 8:55-9:40
      [
        { subject: 'Английский язык', teacher: 'Бычкина М.В.', room: '109' },
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Биология', teacher: 'Мух Б.К.', room: '329' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Литературная мастерская', teacher: 'Пищур С.А.', room: '205' }
      ],
      // 3 урок 9:50-10:35
      [
        { subject: 'Английский язык', teacher: 'Бычкина М.В.', room: '109' },
        { subject: 'Английский язык', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Английский язык', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'Спортзал' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' }
      ],
      // 4 урок 10:55-11:40
      [
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Избранные вопросы математики', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'История', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Русский язык', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'Алгебра и начала мат. анализа', teacher: 'Туктарова Н.Ф.', room: '301' }
      ],
      // 5 урок 11:50-12:35
      [
        { subject: 'Обществознание', teacher: 'Акользина А.В.', room: '416' },
        { subject: 'Геометрия', teacher: 'Туктарова Н.Ф.', room: '301' },
        { subject: 'Литература', teacher: 'Пищур С.А.', room: '205' },
        { subject: 'География', teacher: 'Кинженко Е.Н.', room: '233' },
        { subject: 'История', teacher: 'Акользина А.В.', room: '416' }
      ],
      // 6 урок 12:45-13:30
      [
        { subject: 'Индивидуальный проект', teacher: 'Вахнер Е.И.', room: '105' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'С3' },
        { subject: 'Физика', teacher: 'Вишнева О.А.', room: '322' },
        { subject: 'Английский язык', teacher: 'Чапкова Т.С.', room: '308' },
        { subject: 'Физкультура', teacher: 'Абдурахимова О.П.', room: 'С3' }
      ],
      // 7 урок 13:40-14:25
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
      <div className="bg-gradient-to-r from-diary-yellow to-diary-red p-4 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2 text-center">Расписание 10а класса</h2>
      </div>

      <Card>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-100 text-center font-bold min-w-[60px]">
                    Время
                  </th>
                  {weekSchedule.days.map((day, idx) => (
                    <th key={idx} className="border border-gray-300 p-2 bg-gray-100 text-center font-bold min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekSchedule.times.map((time, timeIdx) => (
                  <tr key={timeIdx}>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-center font-semibold text-diary-blue">
                      {time}
                    </td>
                    {weekSchedule.lessons[timeIdx].map((lesson, dayIdx) => (
                      <td key={dayIdx} className="border border-gray-300 p-2 text-center">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-800 leading-tight">
                            {lesson.subject}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {lesson.teacher}
                          </div>
                          <div className="text-diary-blue text-xs font-medium">
                            ({lesson.room})
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleContent;