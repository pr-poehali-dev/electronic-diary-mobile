import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const GradesPage: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'Алгебра',
      teacher: 'Туктарова Н.Ф.',
      grades: [
        { value: 5, date: '02.09', type: 'exam' },
        { value: 4, date: '09.09', type: 'test' },
        { value: 5, date: '16.09', type: 'homework' },
        { value: 5, date: '23.09', type: 'classwork' },
        { value: 4, date: '26.09', type: 'test' },
      ]
    },
    {
      name: 'Геометрия',
      teacher: 'Туктарова Н.Ф.',
      grades: [
        { value: 5, date: '03.09', type: 'exam' },
        { value: 5, date: '10.09', type: 'classwork' },
        { value: 4, date: '17.09', type: 'homework' },
        { value: 5, date: '24.09', type: 'test' },
      ]
    },
    {
      name: 'Русский язык',
      teacher: 'Пищур С.А.',
      grades: [
        { value: 5, date: '01.09', type: 'dictation' },
        { value: 4, date: '08.09', type: 'essay' },
        { value: 5, date: '15.09', type: 'test' },
        { value: 5, date: '22.09', type: 'classwork' },
        { value: 4, date: '25.09', type: 'homework' },
      ]
    },
    {
      name: 'Литература',
      teacher: 'Пищур С.А.',
      grades: [
        { value: 5, date: '04.09', type: 'essay' },
        { value: 5, date: '11.09', type: 'reading' },
        { value: 5, date: '18.09', type: 'analysis' },
        { value: 4, date: '25.09', type: 'homework' },
      ]
    },
    {
      name: 'Английский язык',
      teacher: 'Чапкова Т.С.',
      grades: [
        { value: 5, date: '02.09', type: 'speaking' },
        { value: 4, date: '09.09', type: 'grammar' },
        { value: 5, date: '16.09', type: 'vocabulary' },
        { value: 5, date: '23.09', type: 'listening' },
        { value: 5, date: '26.09', type: 'test' },
      ]
    },
    {
      name: 'История',
      teacher: 'Акользина А.В.',
      grades: [
        { value: 5, date: '03.09', type: 'test' },
        { value: 5, date: '10.09', type: 'presentation' },
        { value: 4, date: '17.09', type: 'homework' },
        { value: 5, date: '24.09', type: 'essay' },
      ]
    },
    {
      name: 'Обществознание',
      teacher: 'Акользина А.В.',
      grades: [
        { value: 5, date: '05.09', type: 'test' },
        { value: 4, date: '12.09', type: 'classwork' },
        { value: 5, date: '19.09', type: 'project' },
        { value: 5, date: '26.09', type: 'homework' },
      ]
    },
    {
      name: 'Физика',
      teacher: 'Вишнева О.А.',
      grades: [
        { value: 5, date: '06.09', type: 'lab' },
        { value: 4, date: '13.09', type: 'test' },
        { value: 5, date: '20.09', type: 'problem' },
        { value: 5, date: '27.09', type: 'classwork' },
      ]
    },
    {
      name: 'Химия',
      teacher: 'Новикова А.Е.',
      grades: [
        { value: 5, date: '04.09', type: 'lab' },
        { value: 5, date: '11.09', type: 'test' },
        { value: 4, date: '18.09', type: 'homework' },
        { value: 5, date: '25.09', type: 'exam' },
      ]
    },
    {
      name: 'Биология',
      teacher: 'Мух Б.К.',
      grades: [
        { value: 5, date: '07.09', type: 'test' },
        { value: 5, date: '14.09', type: 'lab' },
        { value: 5, date: '21.09', type: 'classwork' },
        { value: 4, date: '28.09', type: 'homework' },
      ]
    },
    {
      name: 'География',
      teacher: 'Кинженко Е.Н.',
      grades: [
        { value: 5, date: '05.09', type: 'map' },
        { value: 4, date: '12.09', type: 'test' },
        { value: 5, date: '19.09', type: 'presentation' },
        { value: 5, date: '26.09', type: 'homework' },
      ]
    },
    {
      name: 'Информатика',
      teacher: 'Рогова И.Р.',
      grades: [
        { value: 5, date: '08.09', type: 'programming' },
        { value: 5, date: '15.09', type: 'test' },
        { value: 5, date: '22.09', type: 'project' },
        { value: 5, date: '29.09', type: 'classwork' },
      ]
    },
  ];

  const calculateAverage = (grades: { value: number }[]) => {
    const sum = grades.reduce((acc, g) => acc + g.value, 0);
    return (sum / grades.length).toFixed(2);
  };

  const getGradeColor = (value: number) => {
    if (value === 5) return 'bg-green-100 text-green-800 border-green-300';
    if (value === 4) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (value === 3) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        <div className="sticky top-0 bg-gradient-to-r from-diary-yellow to-diary-red p-4 text-white z-10 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Icon name="ArrowLeft" size={24} />
            </button>
            <h1 className="text-xl font-bold">Журнал оценок 10а класса</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {subjects.map((subject, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-600">{subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-diary-blue">
                        {calculateAverage(subject.grades)}
                      </div>
                      <div className="text-xs text-gray-500">средний балл</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {subject.grades.map((grade, gIdx) => (
                      <div 
                        key={gIdx}
                        className="flex flex-col items-center"
                      >
                        <div 
                          className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg ${getGradeColor(grade.value)}`}
                        >
                          {grade.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {grade.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <Icon name="Info" size={16} className="inline mr-1" />
              Сентябрь 2025
            </div>
            <div className="text-lg font-bold text-diary-blue">
              Общий средний балл: 4.85
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;