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
  <div className="liquid-glass-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-3 py-2">
    <div className="flex justify-around gap-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => { playClick(); setActiveTab(tab.id); }}
            className={`liquid-glass-btn flex flex-col items-center gap-1 py-2 flex-1 px-0 ${isActive ? 'active' : 'inactive'}`}
          >
            <Icon name={tab.icon} size={20} />
            {isActive && <span className="text-[11px] font-medium leading-none">{tab.label}</span>}
          </button>
        );
      })}
    </div>
  </div>
  );
};

export default BottomNavigation;