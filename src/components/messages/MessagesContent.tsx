import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="bg-gradient-to-r from-diary-red to-red-600 p-4 rounded-xl text-white relative overflow-hidden">
      <h2 className="text-xl font-bold mb-2">Сообщения</h2>
      <p className="text-white/90">5 новых сообщений</p>
      
      {/* Стикер в правом верхнем углу */}
      <div className="absolute -top-4 -right-4 w-24 h-24 transform rotate-12">
        <img 
          src="https://cdn.poehali.dev/files/93758476-4e03-4819-9cc0-77c0592bfd73.jpg" 
          alt="sticker"
          className="w-full h-full object-contain drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            mixBlendMode: 'multiply'
          }}
        />
      </div>
    </div>

    <div className="space-y-3">
      {messages.map((message, idx) => (
        <Card key={idx} className={`${!message.isRead ? 'ring-2 ring-diary-red/20' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-diary-yellow flex-shrink-0">
                <img 
                  src={message.avatar} 
                  alt={message.from}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{message.from}</span>
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-diary-red rounded-full" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{message.subject}</p>
                <span className="text-xs text-diary-blue">{message.time}</span>
              </div>
              <button 
                onClick={() => onChatOpen(message)}
                className="text-muted-foreground hover:text-diary-blue transition-colors"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MessagesContent;