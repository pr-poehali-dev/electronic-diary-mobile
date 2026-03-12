import Icon from '@/components/ui/icon';

export default function ProfilePage() {
  return (
    <div className="min-h-screen biohazard-bg grid-bg pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(74, 222, 128, 0.4)' }}>// PROFILE</span>
          <h1 className="font-heading font-black text-4xl tracking-widest mt-1" style={{
            color: '#4ade80',
            textShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          }}>ПРОФИЛЬ</h1>
        </div>

        {/* Not logged in state */}
        <div className="p-10 rounded-sm text-center" style={{
          background: 'rgba(13, 26, 13, 0.8)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{
            background: 'rgba(74, 222, 128, 0.08)',
            border: '2px solid rgba(74, 222, 128, 0.2)',
          }}>
            <Icon name="User" size={36} style={{ color: 'rgba(74, 222, 128, 0.4)' } as React.CSSProperties} />
          </div>
          <h3 className="font-heading font-bold text-xl tracking-widest mb-3" style={{ color: '#e8f5e9' }}>
            ВОЙДИТЕ ЧЕРЕЗ STEAM
          </h3>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>
            Авторизуйся через Steam чтобы получить доступ к профилю, балансу и истории покупок.
          </p>
          <button className="virus-btn px-8 py-3 rounded-sm text-base inline-flex items-center gap-3">
            <span className="text-xl">🎮</span>
            Войти через Steam
          </button>

          <div className="mt-8 pt-6 grid grid-cols-3 gap-4 text-center" style={{ borderTop: '1px solid rgba(74, 222, 128, 0.1)' }}>
            {[
              { icon: 'Wallet', label: 'Баланс', val: '— ₽' },
              { icon: 'ShoppingBag', label: 'Покупок', val: '—' },
              { icon: 'Crown', label: 'Статус', val: '—' },
            ].map(item => (
              <div key={item.label}>
                <Icon name={item.icon} size={20} className="mx-auto mb-2 opacity-30" style={{ color: '#4ade80' } as React.CSSProperties} />
                <div className="font-heading font-bold text-lg" style={{ color: 'rgba(74, 222, 128, 0.3)' }}>{item.val}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: 'rgba(74, 222, 128, 0.3)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 rounded-sm flex gap-3" style={{
          background: 'rgba(74, 222, 128, 0.04)',
          border: '1px solid rgba(74, 222, 128, 0.1)',
        }}>
          <Icon name="Info" size={16} className="shrink-0 mt-0.5" style={{ color: 'rgba(74, 222, 128, 0.5)' } as React.CSSProperties} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(180, 210, 180, 0.6)' }}>
            Мы используем Steam OpenID для авторизации. Ваш пароль Steam нам не передаётся. 
            Мы видим только публичный профиль и SteamID для идентификации на сервере.
          </p>
        </div>
      </div>
    </div>
  );
}
