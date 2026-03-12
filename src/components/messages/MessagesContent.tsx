import React from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  from: string;
  subject: string;
  time: string;
  isRead: boolean;
  avatar: string;
  role: 'teacher' | 'student';
}

interface MessagesContentProps {
  messages: Message[];
  onChatOpen: (message: Message) => void;
}

const ROLE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  teacher: {
    bg: 'rgba(220,38,38,0.13)',
    border: 'rgba(220,38,38,0.35)',
    text: '#dc2626',
    label: 'Учитель',
  },
  student: {
    bg: 'rgba(59,130,246,0.13)',
    border: 'rgba(59,130,246,0.35)',
    text: '#2563eb',
    label: 'Ученик',
  },
};

const MessagesContent: React.FC<MessagesContentProps> = ({ messages, onChatOpen }) => {
  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-3 animate-fade-in pb-2">

      {/* Header — как в расписании */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.4) inset',
        padding: '14px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <p className="text-center text-xs font-medium" style={{ color: 'rgba(220,38,38,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          10А класс
        </p>
        <h2 className="text-center text-lg font-bold mt-0.5" style={{ color: 'rgba(30,10,10,0.9)' }}>
          Сообщения
        </h2>
        {unread > 0 && (
          <div className="flex justify-center mt-2">
            <span style={{
              background: 'rgba(220,38,38,0.12)',
              border: '1px solid rgba(220,38,38,0.25)',
              borderRadius: 20,
              padding: '2px 12px',
              fontSize: 12,
              color: '#dc2626',
              fontWeight: 600,
            }}>
              {unread} непрочитанных
            </span>
          </div>
        )}
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
                <img
                  src={message.avatar}
                  alt={message.from}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
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
                      background: '#dc2626',
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
