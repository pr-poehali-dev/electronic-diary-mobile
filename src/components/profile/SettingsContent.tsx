import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsContentProps {
  onBack: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();
  const [gradesNotify, setGradesNotify] = useState(
    () => localStorage.getItem('notify_grades') !== 'false'
  );
  const [homeworkNotify, setHomeworkNotify] = useState(
    () => localStorage.getItem('notify_homework') === 'true'
  );
  const [scheduleNotify, setScheduleNotify] = useState(
    () => localStorage.getItem('notify_schedule') === 'true'
  );

  const handleGrades = () => {
    const next = !gradesNotify;
    setGradesNotify(next);
    localStorage.setItem('notify_grades', String(next));
  };
  const handleHomework = () => {
    const next = !homeworkNotify;
    setHomeworkNotify(next);
    localStorage.setItem('notify_homework', String(next));
  };
  const handleSchedule = () => {
    const next = !scheduleNotify;
    setScheduleNotify(next);
    localStorage.setItem('notify_schedule', String(next));
  };

  return (
    <div className="space-y-3 animate-fade-in pb-2">

      {/* Шапка */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(220,38,38,0.12)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 12,
            width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#dc2626',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        >
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(220,38,38,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Профиль</p>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: 'rgba(30,10,10,0.9)', marginTop: 1 }}>Настройки</h2>
        </div>
      </div>

      {/* Внешний вид */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.22)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '10px 16px 6px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(220,38,38,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Внешний вид</p>
        </div>

        {/* Светлая тема */}
        <button
          onClick={() => theme === 'dark' && toggleTheme()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 16px',
            background: theme === 'light' ? 'rgba(220,38,38,0.07)' : 'transparent',
            border: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
        >
          <div style={{
            width: 40, height: 40,
            borderRadius: 12,
            background: 'rgba(251,191,36,0.15)',
            border: '1px solid rgba(251,191,36,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name="Sun" size={20} />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'rgba(30,10,10,0.9)' }}>Светлая тема</p>
            <p style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginTop: 1 }}>Яркий дневной режим</p>
          </div>
          <div style={{
            width: 20, height: 20,
            borderRadius: '50%',
            border: `2px solid ${theme === 'light' ? '#dc2626' : 'rgba(30,10,10,0.25)'}`,
            background: theme === 'light' ? '#dc2626' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {theme === 'light' && <Icon name="Check" size={11} style={{ color: 'white' }} />}
          </div>
        </button>

        {/* Тёмная тема */}
        <button
          onClick={() => theme === 'light' && toggleTheme()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 16px',
            background: theme === 'dark' ? 'rgba(220,38,38,0.07)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
        >
          <div style={{
            width: 40, height: 40,
            borderRadius: 12,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name="Moon" size={20} />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'rgba(30,10,10,0.9)' }}>Тёмная тема</p>
            <p style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginTop: 1 }}>Ночной режим</p>
          </div>
          <div style={{
            width: 20, height: 20,
            borderRadius: '50%',
            border: `2px solid ${theme === 'dark' ? '#dc2626' : 'rgba(30,10,10,0.25)'}`,
            background: theme === 'dark' ? '#dc2626' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {theme === 'dark' && <Icon name="Check" size={11} style={{ color: 'white' }} />}
          </div>
        </button>
      </div>

      {/* Уведомления */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.22)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '10px 16px 6px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(220,38,38,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Уведомления</p>
        </div>

        <ToggleRow
          icon="Star"
          iconBg="rgba(220,38,38,0.13)"
          iconBorder="rgba(220,38,38,0.3)"
          title="Об оценках"
          subtitle="Новые оценки в дневнике"
          value={gradesNotify}
          onChange={handleGrades}
        />
        <ToggleRow
          icon="BookOpen"
          iconBg="rgba(59,130,246,0.13)"
          iconBorder="rgba(59,130,246,0.3)"
          title="Домашние задания"
          subtitle="Напоминания о домашке"
          value={homeworkNotify}
          onChange={handleHomework}
          border
        />
        <ToggleRow
          icon="Calendar"
          iconBg="rgba(168,85,247,0.13)"
          iconBorder="rgba(168,85,247,0.3)"
          title="Изменения в расписании"
          subtitle="Замены и переносы уроков"
          value={scheduleNotify}
          onChange={handleSchedule}
        />
      </div>
    </div>
  );
};

interface ToggleRowProps {
  icon: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  subtitle: string;
  value: boolean;
  onChange: () => void;
  border?: boolean;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon, iconBg, iconBorder, title, subtitle, value, onChange, border }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '13px 16px',
    borderBottom: border ? '1px solid rgba(255,255,255,0.10)' : 'none',
  }}>
    <div style={{
      width: 40, height: 40,
      borderRadius: 12,
      background: iconBg,
      border: `1px solid ${iconBorder}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name={icon} size={20} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontWeight: 600, fontSize: 14, color: 'rgba(30,10,10,0.9)' }}>{title}</p>
      <p style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginTop: 1 }}>{subtitle}</p>
    </div>
    <button
      onClick={onChange}
      style={{
        width: 48, height: 27,
        borderRadius: 50,
        background: value ? '#dc2626' : 'rgba(30,10,10,0.15)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: value ? 24 : 3,
        width: 21, height: 21,
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </button>
  </div>
);

export default SettingsContent;
