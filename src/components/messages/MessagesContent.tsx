import React from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  from: string;
  subject: string;
  time: string;
  isRead: boolean;
  avatar: string;
}

interface MessagesContentProps {
  messages: Message[];
  onChatOpen: (message: Message) => void;
}

const MessagesContent: React.FC<MessagesContentProps> = ({ messages, onChatOpen }) => (
  <div className="space-y-4 animate-fade-in">

    {/* Hero */}
    <div className="glass-red p-5 relative overflow-hidden">
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }} />
      <h2 className="text-2xl font-bold text-white relative z-10">Сообщения</h2>
      <p className="text-white/70 text-sm mt-1 relative z-10">5 новых сообщений</p>
    </div>

    {/* Список */}
    <div className="space-y-3">
      {messages.map((message, idx) => (
        <button
          key={idx}
          className={`glass w-full text-left transition-transform hover:scale-[1.01] ${!message.isRead ? 'ring-1 ring-white/20' : ''}`}
          onClick={() => onChatOpen(message)}
        >
          <div className="flex items-center gap-3 p-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: '2px solid rgba(234,179,8,0.6)', boxShadow: '0 0 12px rgba(234,179,8,0.2)' }}>
              <img src={message.avatar} alt={message.from} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-white text-sm truncate">{message.from}</span>
                {!message.isRead && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#DC2626', boxShadow: '0 0 6px #DC2626' }} />
                )}
              </div>
              <p className="text-white/60 text-xs truncate">{message.subject}</p>
              <span className="text-white/40 text-xs">{message.time}</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/30 flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default MessagesContent;
