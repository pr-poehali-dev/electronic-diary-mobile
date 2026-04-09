import React from 'react';
import Icon from '@/components/ui/icon';
import useClickSound from '@/hooks/use-click-sound';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  { id: 'diary',    icon: 'BookOpen',      label: 'Дневник'    },
  { id: 'messages', icon: 'MessageCircle', label: 'Сообщения'  },
  { id: 'schedule', icon: 'Calendar',      label: 'Расписание' },
  { id: 'card',     icon: 'CreditCard',    label: 'Карта'      },
  { id: 'profile',  icon: 'UserCircle',    label: 'Профиль'    },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  const playClick = useClickSound();
  return (
  <div
    style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 448,
      background: 'rgba(13,27,75,0.88)',
      backdropFilter: 'blur(32px) saturate(2)',
      WebkitBackdropFilter: 'blur(32px) saturate(2)',
      borderTop: '1px solid rgba(245,200,0,0.25)',
      boxShadow: '0 -4px 32px rgba(13,27,75,0.3)',
      padding: '10px 12px 14px',
    }}
  >
    <div className="flex justify-around gap-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => { playClick(); setActiveTab(tab.id); }}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 4px',
              borderRadius: 16,
              border: isActive ? '1.5px solid rgba(245,200,0,0.4)' : '1.5px solid transparent',
              background: isActive
                ? 'linear-gradient(135deg, rgba(232,0,14,0.35) 0%, rgba(232,0,14,0.18) 100%)'
                : 'transparent',
              color: isActive ? '#F5C800' : 'rgba(255,255,255,0.38)',
              transform: isActive ? 'translateY(-2px) scale(1.06)' : 'scale(1)',
              transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: isActive ? '0 4px 16px rgba(232,0,14,0.25)' : 'none',
              cursor: 'pointer',
            }}
          >
            <Icon name={tab.icon} size={20} />
            {isActive && (
              <span style={{ fontSize: 10, fontWeight: 700, lineHeight: 1, color: '#F5C800', letterSpacing: '0.03em' }}>
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
  );
};

export default BottomNavigation;