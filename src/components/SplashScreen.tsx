import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="animate-pulse">
        <img 
          src="https://cdn.poehali.dev/files/efb0453e-6225-4d0d-a514-a285a7ff9d5d.PNG" 
          alt="Logo" 
          className="w-48 h-48 object-contain"
        />
      </div>
    </div>
  );
};

export default SplashScreen;