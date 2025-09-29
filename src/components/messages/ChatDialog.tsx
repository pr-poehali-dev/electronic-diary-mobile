import React from 'react';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  text: string;
  isTeacher: boolean;
  time: string;
  avatar?: string;
}

interface Chat {
  from: string;
  subject: string;
  time: string;
  avatar: string;
}

interface ChatDialogProps {
  chat: Chat;
  onBack: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ chat, onBack, newMessage, setNewMessage }) => {
  const chatMessages: ChatMessage[] = [
    {
      text: chat.subject,
      isTeacher: true,
      time: chat.time,
      avatar: chat.avatar
    },
    {
      text: "Спасибо за информацию! А когда будет следующий урок?",
      isTeacher: false,
      time: "14:32"
    },
    {
      text: "Завтра в обычное время, не забудьте учебники!",
      isTeacher: true,
      time: "14:35",
      avatar: chat.avatar
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Здесь можно добавить логику отправки
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in h-full flex flex-col">
      {/* Заголовок чата */}
      <div className="bg-gradient-to-r from-diary-blue to-diary-yellow p-4 rounded-xl text-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={chat.avatar} 
              alt={chat.from}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{chat.from}</h2>
            <p className="text-white/90 text-sm">онлайн</p>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 space-y-3 min-h-0 overflow-y-auto">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.isTeacher ? '' : 'flex-row-reverse'}`}>
            {msg.isTeacher && (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-diary-yellow flex-shrink-0">
                <img 
                  src={msg.avatar} 
                  alt={chat.from}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className={`max-w-[70%] p-3 rounded-2xl ${
              msg.isTeacher 
                ? 'bg-white border border-gray-200' 
                : 'bg-diary-blue text-white'
            }`}>
              <p className={`text-sm ${msg.isTeacher ? 'text-gray-800' : 'text-white'}`}>
                {msg.text}
              </p>
              <span className={`text-xs mt-1 block ${
                msg.isTeacher ? 'text-gray-500' : 'text-white/70'
              }`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Поле ввода */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Написать сообщение..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-diary-blue"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-diary-blue text-white p-2 rounded-full hover:bg-diary-blue/90 transition-colors"
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;