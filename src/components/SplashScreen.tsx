import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: '#DC2626' }}
    >
      {/* Диагональные полосы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-full opacity-90"
          style={{ background: '#EAB308', clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 10% 100%)' }} />
        <div className="absolute top-0 right-32 w-16 h-full opacity-70"
          style={{ background: '#1a1235', clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 10% 100%)' }} />
      </div>

      {/* Логотип */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div style={{ border: '4px solid #1a1235', boxShadow: '6px 6px 0 #1a1235', background: '#fff', padding: 4 }}>
          <img
            src="https://cdn.poehali.dev/files/efb0453e-6225-4d0d-a514-a285a7ff9d5d.PNG"
            alt="Logo"
            className="w-28 h-28 object-contain"
          />
        </div>
        <div style={{ fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', textShadow: '2px 2px 0 #1a1235' }}>
          Электронный дневник
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: '#1a1235' }} />
    </div>
  );
};

export default SplashScreen;
