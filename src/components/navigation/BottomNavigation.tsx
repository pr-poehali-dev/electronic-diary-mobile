import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-4 py-2">
    <div className="flex justify-around">
      {[
        { id: 'diary', icon: 'BookOpen', label: 'Дневник', color: 'bg-diary-red text-white' },
        { id: 'messages', icon: 'MessageCircle', label: 'Сообщения', color: 'bg-diary-blue text-white' },
        { id: 'schedule', icon: 'Calendar', label: 'Расписание', color: 'bg-diary-yellow text-black' },
        { id: 'card', icon: 'CreditCard', label: 'Карта', color: 'bg-diary-blue text-white' },
        { id: 'profile', icon: 'UserCircle', label: 'Профиль', color: 'bg-diary-red text-white' },
      ].map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 h-auto py-2 flex-1 px-0 ${
            activeTab === tab.id ? tab.color : 'text-gray-600'
          }`}
        >
          <Icon name={tab.icon} size={18} />
          <span className="text-xs">{tab.label}</span>
        </Button>
      ))}
    </div>
  </div>
);

export default BottomNavigation;