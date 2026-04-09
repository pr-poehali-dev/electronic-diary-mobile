import React from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  from: string;
  subject: string;
  time: string;
  isRead: boolean;
  avatar: string;
  avatarColor?: string;
  role: 'teacher' | 'student';
}

const DefaultAvatar: React.FC<{ color: string; size?: number }> = ({ color, size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="26" fill={color} />
    <ellipse cx="26" cy="48" rx="17" ry="11" fill="white" fillOpacity="0.25" />
    <circle cx="26" cy="19" r="10" fill="white" fillOpacity="0.92" />
    <ellipse cx="26" cy="44" rx="15" ry="9" fill="white" fillOpacity="0.75" />
  </svg>
);

interface MessagesContentProps {
  messages: Message[];
  onChatOpen: (message: Message) => void;
  onNewChat?: () => void;
}

const ROLE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  teacher: {
    bg: 'rgba(232,0,14,0.1)',
    border: 'rgba(232,0,14,0.32)',
    text: '#E8000E',
    label: 'Учитель',
  },
  student: {
    bg: 'rgba(13,27,75,0.1)',
    border: 'rgba(13,27,75,0.28)',
    text: '#0D1B4B',
    label: 'Ученик',
  },
};

const MessagesContent: React.FC<MessagesContentProps> = ({ messages, onChatOpen, onNewChat }) => {
  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-3 animate-fade-in pb-2">

      {/* Header */}
      <div style={{
        borderRadius: 22,
        overflow: 'hidden',
        position: 'relative',
        background: '#E8000E',
        boxShadow: '0 6px 32px rgba(232,0,14,0.4)',
        padding: '20px 22px',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -20,
          width: 130, height: 240,
          background: '#F5C800',
          transform: 'rotate(-18deg)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: -30, right: -52,
          width: 130, height: 240,
          background: '#0D1B4B',
          transform: 'rotate(-18deg)',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
            10А класс
          </p>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 900, lineHeight: 1.1, marginBottom: 10 }}>
            Сообщения
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {unread > 0 && (
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 20,
                padding: '3px 12px',
                fontSize: 12,
                color: '#fff',
                fontWeight: 700,
              }}>
                {unread} непрочитанных
              </span>
            )}
            {onNewChat && (
              <button
                onClick={onNewChat}
                style={{
                  background: '#F5C800',
                  border: 'none',
                  borderRadius: 50,
                  padding: '5px 14px',
                  color: '#0D1B4B',
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Icon name="Plus" size={13} />
                Новый чат
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Список переписок */}
      <div className="space-y-2">
        {messages.map((message, idx) => {
          const role = ROLE_COLORS[message.role];
          return (
            <button
              key={idx}
              onClick={() => onChatOpen(message)}
              style={{
                width: '100%',
                background: message.isRead ? 'rgba(255,255,255,0.10)' : role.bg,
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                borderRadius: 16,
                border: `1px solid ${message.isRead ? 'rgba(255,255,255,0.22)' : role.border}`,
                boxShadow: message.isRead
                  ? '0 2px 12px rgba(0,0,0,0.05)'
                  : `0 2px 16px ${role.bg}`,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textAlign: 'left',
                transition: 'all 0.18s',
                cursor: 'pointer',
              }}
            >
              {/* Аватар */}
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${role.border}`,
                flexShrink: 0,
              }}>
                {message.avatar ? (
                  <img
                    src={message.avatar}
                    alt={message.from}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <DefaultAvatar color={message.avatarColor || '#4f8ef7'} size={52} />
                )}
              </div>

              {/* Инфо */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'rgba(30,10,10,0.9)' }}>
                    {message.from}
                  </span>
                  {!message.isRead && (
                    <div style={{
                      width: 7, height: 7,
                      borderRadius: '50%',
                      background: '#E8000E',
                      flexShrink: 0,
                    }} />
                  )}
                </div>
                {/* Роль */}
                <span style={{
                  display: 'inline-block',
                  fontSize: 10,
                  fontWeight: 600,
                  color: role.text,
                  background: role.bg,
                  border: `1px solid ${role.border}`,
                  borderRadius: 8,
                  padding: '1px 7px',
                  marginBottom: 4,
                  letterSpacing: '0.04em',
                }}>
                  {role.label}
                </span>
                <p style={{
                  fontSize: 12,
                  color: 'rgba(30,10,10,0.55)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}>
                  {message.subject}
                </p>
              </div>

              {/* Время + стрелка */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: 'rgba(30,10,10,0.4)', fontWeight: 500 }}>
                  {message.time}
                </span>
                <Icon name="ChevronRight" size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesContent;