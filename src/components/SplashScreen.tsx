import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SplashScreenProps {
  onFinish: () => void;
}

const quotes = [
  { text: 'Знания — это крылья, которые несут нас вперёд.', author: 'Учительская мудрость' },
  { text: 'Каждый день — шанс стать умнее, чем вчера.', author: 'Альберт Эйнштейн' },
  { text: 'Образование — это самое мощное оружие, чтобы изменить мир.', author: 'Нельсон Мандела' },
  { text: 'Учись так, словно ты постоянно ощущаешь нехватку знаний.', author: 'Конфуций' },
  { text: 'Инвестиции в знания всегда дают наибольший доход.', author: 'Бенджамин Франклин' },
  { text: 'Гений — это 1% вдохновения и 99% пота.', author: 'Томас Эдисон' },
  { text: 'Тот, кто открывает школу, закрывает тюрьму.', author: 'Виктор Гюго' },
  { text: 'Никогда не прекращай учиться, потому что жизнь никогда не прекращает учить.', author: 'Народная мудрость' },
  { text: 'Трудности делают нас сильнее — учёба не исключение.', author: 'Школьная мудрость' },
  { text: 'Твоё будущее создаётся прямо сейчас, за партой.', author: 'Для тебя' },
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const q = setTimeout(() => setQuoteVisible(true), 400);
    const t = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 3500);
    return () => { clearTimeout(q); clearTimeout(t); };
  }, [onFinish]);

  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: isDark ? '#0a0a0a' : '#fff8f5' }}
    >
      <div className="animate-pulse mb-8">
        <img
          src="https://cdn.poehali.dev/files/efb0453e-6225-4d0d-a514-a285a7ff9d5d.PNG"
          alt="Logo"
          className="w-40 h-40 object-contain"
        />
      </div>

      <div
        style={{
          maxWidth: 300,
          textAlign: 'center',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? 'translateY(0)' : 'translateY(12px)',
          background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(220,38,38,0.06)',
          border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(220,38,38,0.15)',
          borderRadius: 18,
          padding: '16px 20px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ fontSize: 18, marginBottom: 8, opacity: 0.5 }}>❝</div>
        <p style={{
          fontSize: 13.5,
          fontWeight: 500,
          lineHeight: 1.55,
          color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(30,10,10,0.8)',
          marginBottom: 10,
        }}>
          {quote.text}
        </p>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(220,38,38,0.55)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          — {quote.author}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
