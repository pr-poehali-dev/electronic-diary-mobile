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
  role: 'teacher' | 'student';
}

interface ChatDialogProps {
  chat: Chat;
  onBack: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

const CHAT_DIALOGS: Record<string, ChatMessage[]> = {
  'Цвирко В.Ю.': [
    { text: 'Добрый день! Напоминаю, что завтра контрольная по алгебре — темы: тригонометрия и логарифмы.', isTeacher: true, time: '14:28' },
    { text: 'Здравствуйте! Поняла, спасибо. А какие задания повторить?', isTeacher: false, time: '14:30' },
    { text: 'Задачи из §12 и §14, там разборы к ним есть. Удачи!', isTeacher: true, time: '14:31' },
    { text: 'Спасибо большое, буду готовиться!', isTeacher: false, time: '14:33' },
  ],
  'НСКИН': [
    { text: 'Контрольная работа по физике перенесена на пятницу, 4-й урок. Явка обязательна.', isTeacher: true, time: '12:10' },
    { text: 'Хорошо, понял. А программа та же?', isTeacher: false, time: '12:15' },
    { text: 'Да, темы те же: электромагнетизм и оптика.', isTeacher: true, time: '12:17' },
    { text: 'Окей, готовлюсь! Спасибо за предупреждение.', isTeacher: false, time: '12:18' },
    { text: 'Пожалуйста. Если есть вопросы — спрашивай.', isTeacher: true, time: '12:20' },
  ],
  'Дрёмов А.А.': [
    { text: 'Уважаемые родители и ученики! Собрание состоится в пятницу в 18:00 в актовом зале. Тема: итоги четверти.', isTeacher: true, time: '09:00' },
    { text: 'Понял, передам родителям. Обязательно придём.', isTeacher: false, time: '09:15' },
    { text: 'Отлично! Также обсудим подготовку к олимпиадам и поездку в Москву.', isTeacher: true, time: '09:18' },
    { text: 'Про Москву интересно! Что нужно подготовить?', isTeacher: false, time: '09:20' },
    { text: 'Всё расскажем на собрании. До встречи!', isTeacher: true, time: '09:21' },
  ],
  'Борисова М.А.': [
    { text: 'Привет! По олимпиаде по химии: нужно решить задачи из прошлогоднего сборника, стр. 45–60.', isTeacher: true, time: '16:40' },
    { text: 'Хорошо, уже начала. Там реакции окисления — могу уточнить по 3-й задаче?', isTeacher: false, time: '16:45' },
    { text: 'Конечно! Там надо учитывать степень окисления марганца. Напиши полное уравнение.', isTeacher: true, time: '16:48' },
    { text: 'Поняла, попробую ещё раз. Спасибо!', isTeacher: false, time: '16:50' },
    { text: 'Молодец, ты справишься! Ты очень хорошо подготовлена.', isTeacher: true, time: '16:52' },
  ],
  'Сидни Прескотт': [
    { text: 'Привет! Помнишь про экскурсию в музей изобразительных искусств? Надо сдать деньги до среды.', isTeacher: false, time: '08:15' },
    { text: 'Да помню! Сколько там было?', isTeacher: false, time: '08:18' },
    { text: 'Привет! 350 рублей, сдаём старосте.', isTeacher: false, time: '08:20' },
    { text: 'Окей, занесу завтра! Говорят, там классные импрессионисты?', isTeacher: false, time: '08:22' },
    { text: 'Да, и современное искусство тоже! Будет весело.', isTeacher: false, time: '08:24' },
  ],
  'Карина Белова': [
    { text: 'Привет! Скинешь домашку по биологии? Я параграф 18 не успела записать.', isTeacher: false, time: '17:10' },
    { text: 'Привет! Да, конечно. §18 — строение клетки, там 3 вопроса в конце.', isTeacher: true, time: '17:13' },
    { text: 'Ааа, точно! А рисунок надо перерисовывать?', isTeacher: false, time: '17:14' },
    { text: 'Мне сказали схематично, не обязательно красиво.', isTeacher: true, time: '17:15' },
    { text: 'Окей, спасибо огромное! Ты меня спасла 🙏', isTeacher: false, time: '17:16' },
  ],
  'Максим Ефимов': [
    { text: 'Привет! Ты после уроков идёшь на тренировку?', isTeacher: false, time: '12:30' },
    { text: 'Да, планирую. А что?', isTeacher: true, time: '12:32' },
    { text: 'Можешь меня подождать? У меня дополнительный урок до 15:30.', isTeacher: false, time: '12:33' },
    { text: 'Конечно, встретимся у раздевалки.', isTeacher: true, time: '12:34' },
    { text: 'Отлично, договорились!', isTeacher: false, time: '12:35' },
  ],
  'Алина Романова': [
    { text: 'Привет! Я списала расписание на следующую неделю с доски.', isTeacher: false, time: '14:00' },
    { text: 'О, отлично! Там есть изменения?', isTeacher: true, time: '14:02' },
    { text: 'Да, в среду вместо физкультуры будет классный час, а в пятницу — химия перенесена на 3-й урок.', isTeacher: false, time: '14:03' },
    { text: 'Спасибо, не знала! Надо всем в чат скинуть.', isTeacher: true, time: '14:05' },
    { text: 'Уже скинула в общий 😊', isTeacher: false, time: '14:06' },
  ],
  'Денис Краснов': [
    { text: 'Когда сдавать проект по информатике?', isTeacher: false, time: '11:15' },
    { text: 'До конца следующей недели. Тема ещё не выбрал?', isTeacher: true, time: '11:18' },
    { text: 'Хотел сделать про нейросети, норм?', isTeacher: false, time: '11:20' },
    { text: 'Отличная тема! Только сузь — например, "применение нейросетей в медицине".', isTeacher: true, time: '11:22' },
    { text: 'Понял, спасибо! Начну сегодня.', isTeacher: false, time: '11:23' },
    { text: 'Если понадобится помощь — пиши.', isTeacher: true, time: '11:24' },
  ],
};

const ChatDialog: React.FC<ChatDialogProps> = ({ chat, onBack, newMessage, setNewMessage }) => {
  const chatMessages = CHAT_DIALOGS[chat.from] ?? [
    { text: chat.subject, isTeacher: chat.role === 'teacher', time: chat.time, avatar: chat.avatar },
    { text: 'Хорошо, понял. Спасибо!', isTeacher: false, time: '14:32' },
    { text: 'Пожалуйста! Обращайся, если что.', isTeacher: chat.role === 'teacher', time: '14:35', avatar: chat.avatar },
  ];

  const isStudentChat = chat.role === 'student';

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-3 animate-fade-in flex flex-col" style={{ minHeight: '80vh' }}>

      {/* Заголовок — стиль расписания */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '12px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(220,38,38,0.12)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: 12,
              width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#dc2626',
              flexShrink: 0,
            }}
          >
            <Icon name="ArrowLeft" size={20} />
          </button>

          <div style={{
            width: 46, height: 46,
            borderRadius: '50%',
            overflow: 'hidden',
            border: isStudentChat ? '2px solid rgba(59,130,246,0.5)' : '2px solid rgba(220,38,38,0.4)',
            flexShrink: 0,
          }}>
            <img src={chat.avatar} alt={chat.from} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: 'rgba(30,10,10,0.9)' }}>
                {chat.from}
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: isStudentChat ? '#2563eb' : '#dc2626',
                background: isStudentChat ? 'rgba(59,130,246,0.12)' : 'rgba(220,38,38,0.10)',
                border: `1px solid ${isStudentChat ? 'rgba(59,130,246,0.3)' : 'rgba(220,38,38,0.25)'}`,
                borderRadius: 8,
                padding: '1px 7px',
                letterSpacing: '0.04em',
              }}>
                {isStudentChat ? 'Ученик' : 'Учитель'}
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(30,10,10,0.4)', marginTop: 1 }}>онлайн</p>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chatMessages.map((msg, idx) => {
          const isMine = !msg.isTeacher;
          return (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: isMine ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: 8,
            }}>
              {!isMine && (
                <div style={{
                  width: 34, height: 34,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(220,38,38,0.3)',
                  flexShrink: 0,
                }}>
                  <img src={chat.avatar} alt={chat.from} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{
                maxWidth: '72%',
                background: isMine
                  ? 'rgba(220,38,38,0.15)'
                  : 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: isMine
                  ? '1px solid rgba(220,38,38,0.25)'
                  : '1px solid rgba(255,255,255,0.4)',
                borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 13px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              }}>
                <p style={{ fontSize: 13, color: 'rgba(30,10,10,0.88)', lineHeight: 1.45 }}>
                  {msg.text}
                </p>
                <span style={{ fontSize: 10, color: 'rgba(30,10,10,0.38)', display: 'block', marginTop: 4, textAlign: isMine ? 'right' : 'left' }}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Поле ввода */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.25)',
        padding: '10px 12px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Написать сообщение..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 50,
            padding: '8px 14px',
            fontSize: 13,
            outline: 'none',
            color: 'rgba(30,10,10,0.85)',
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            background: 'rgba(220,38,38,0.85)',
            border: 'none',
            borderRadius: '50%',
            width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Icon name="Send" size={17} />
        </button>
      </div>
    </div>
  );
};

export default ChatDialog;