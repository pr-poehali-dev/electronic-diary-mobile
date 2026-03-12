import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

const MESSAGES_URL = 'https://functions.poehali.dev/43a45504-b774-474c-b6f7-093c1addeb2d';

interface FoundUser {
  id: number;
  name: string;
  email: string;
}

interface NewChatDialogProps {
  currentUserId: number;
  onClose: () => void;
  onChatStarted: (partnerId: number, partnerName: string, partnerAvatar: string) => void;
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({ currentUserId, onClose, onChatStarted }) => {
  const [inputId, setInputId] = useState('');
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstMessage, setFirstMessage] = useState('');
  const [sending, setSending] = useState(false);

  const searchUser = async () => {
    const id = parseInt(inputId);
    if (!id || isNaN(id)) {
      setError('Введите корректный ID');
      return;
    }
    if (id === currentUserId) {
      setError('Это ваш собственный ID');
      return;
    }
    setLoading(true);
    setError(null);
    setFoundUser(null);

    try {
      const res = await fetch(`${MESSAGES_URL}?action=find_user&user_id=${id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Пользователь не найден');
      } else {
        setFoundUser(data);
      }
    } catch {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const startChat = async () => {
    if (!foundUser || !firstMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${MESSAGES_URL}?action=send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_id: currentUserId, to_id: foundUser.id, text: firstMessage.trim() }),
      });
      if (res.ok) {
        onChatStarted(foundUser.id, foundUser.name, '');
      } else {
        const d = await res.json();
        setError(d.error || 'Ошибка отправки');
      }
    } catch {
      setError('Ошибка сети');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(32px)',
        borderRadius: '24px 24px 0 0',
        padding: 24,
        paddingBottom: 36,
      }}>
        {/* Заголовок */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 17, color: 'rgba(30,10,10,0.9)' }}>Новый чат</h3>
          <button onClick={onClose} style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', cursor: 'pointer' }}>
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Поиск по ID */}
        <p style={{ fontSize: 12, color: 'rgba(30,10,10,0.5)', marginBottom: 8 }}>Введите ID аккаунта собеседника</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="number"
            value={inputId}
            onChange={(e) => { setInputId(e.target.value); setError(null); setFoundUser(null); }}
            placeholder="Например: 42"
            style={{
              flex: 1,
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: 50,
              padding: '10px 16px',
              fontSize: 14,
              outline: 'none',
            }}
            onKeyDown={(e) => e.key === 'Enter' && searchUser()}
          />
          <button
            onClick={searchUser}
            disabled={loading}
            style={{
              background: '#dc2626',
              border: 'none',
              borderRadius: 50,
              padding: '10px 18px',
              color: 'white',
              fontWeight: 600,
              fontSize: 13,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '...' : 'Найти'}
          </button>
        </div>

        {/* Ошибка */}
        {error && (
          <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
            {error}
          </div>
        )}

        {/* Найденный пользователь */}
        {foundUser && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 16,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #dc2626, #f87171)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}>
                {foundUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(30,10,10,0.9)' }}>{foundUser.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginTop: 1 }}>ID: {foundUser.id} · {foundUser.email}</div>
              </div>
              <Icon name="CheckCircle" size={18} style={{ color: '#16a34a', marginLeft: 'auto' }} />
            </div>

            <textarea
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
              placeholder="Первое сообщение..."
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(220,38,38,0.06)',
                border: '1px solid rgba(220,38,38,0.2)',
                borderRadius: 16,
                padding: '10px 14px',
                fontSize: 13,
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />

            <button
              onClick={startChat}
              disabled={!firstMessage.trim() || sending}
              style={{
                width: '100%',
                marginTop: 10,
                background: firstMessage.trim() ? '#dc2626' : 'rgba(220,38,38,0.3)',
                border: 'none',
                borderRadius: 50,
                padding: '12px',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                cursor: firstMessage.trim() && !sending ? 'pointer' : 'not-allowed',
              }}
            >
              {sending ? 'Отправляю...' : 'Начать переписку'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewChatDialog;
