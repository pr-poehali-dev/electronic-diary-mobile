import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
    <div className="flex justify-around">
      <Button
        variant={activeTab === 'diary' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setActiveTab('diary')}
        className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
          activeTab === 'diary' ? 'bg-diary-red text-white' : 'text-gray-600'
        }`}
      >
        <Icon name="BookOpen" size={20} />
        <span className="text-xs">Дневник</span>
      </Button>

      <Button
        variant={activeTab === 'messages' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setActiveTab('messages')}
        className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
          activeTab === 'messages' ? 'bg-diary-blue text-white' : 'text-gray-600'
        }`}
      >
        <Icon name="MessageCircle" size={20} />
        <span className="text-xs">Сообщения</span>
      </Button>

      <Button
        variant={activeTab === 'schedule' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setActiveTab('schedule')}
        className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
          activeTab === 'schedule' ? 'bg-diary-yellow text-black' : 'text-gray-600'
        }`}
      >
        <Icon name="Calendar" size={18} />
        <span className="text-xs">Расписание</span>
      </Button>

      <Button
        variant={activeTab === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setActiveTab('card')}
        className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
          activeTab === 'card' ? 'bg-diary-blue text-white' : 'text-gray-600'
        }`}
      >
        <Icon name="CreditCard" size={18} />
        <span className="text-xs">Карта</span>
      </Button>
    </div>
  </div>
);

export default BottomNavigation;