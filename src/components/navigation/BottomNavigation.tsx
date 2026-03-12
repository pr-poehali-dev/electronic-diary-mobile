import React from 'react';
import Icon from '@/components/ui/icon';

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

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => (
  <div
    className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-3 py-2"
    style={{
      background: 'rgba(245, 240, 232, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '3px solid #1a1235',
      boxShadow: '0 -2px 0 #DC2626',
    }}
  >
    <div className="flex justify-around gap-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1 py-2 flex-1 px-0 transition-all duration-150"
            style={{
              fontFamily: 'Oswald, Impact, sans-serif',
              fontWeight: isActive ? 700 : 500,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: isActive ? '#DC2626' : '#1a1235',
              borderBottom: isActive ? '3px solid #DC2626' : '3px solid transparent',
              borderRadius: 0,
              background: isActive ? 'rgba(220,38,38,0.08)' : 'transparent',
            }}
          >
            <Icon name={tab.icon} size={20} />
            {isActive && <span>{tab.label}</span>}
          </button>
        );
      })}
    </div>
  </div>
);

export default BottomNavigation;
