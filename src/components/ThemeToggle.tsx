import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="rounded-full w-10 h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      {theme === 'light' ? (
        <Icon name="Moon" size={20} className="text-gray-700" />
      ) : (
        <Icon name="Sun" size={20} className="text-yellow-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;