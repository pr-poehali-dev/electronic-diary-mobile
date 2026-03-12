import React, { useState } from 'react';
import { useAuth } from '@/components/extensions/auth-email/useAuth';
import { LoginForm } from '@/components/extensions/auth-email/LoginForm';
import { RegisterForm } from '@/components/extensions/auth-email/RegisterForm';
import { UserProfile } from '@/components/extensions/auth-email/UserProfile';
import { ResetPasswordForm } from '@/components/extensions/auth-email/ResetPasswordForm';
import SettingsContent from '@/components/profile/SettingsContent';

const AUTH_URL = "https://functions.poehali.dev/6aff0bd6-3e2f-42fe-b6d9-f23fdefea356";

type View = 'login' | 'register' | 'reset';

const ProfileContent = () => {
  const [view, setView] = useState<View>('login');
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const auth = useAuth({
    apiUrls: {
      login: `${AUTH_URL}?action=login`,
      register: `${AUTH_URL}?action=register`,
      verifyEmail: `${AUTH_URL}?action=verify-email`,
      refresh: `${AUTH_URL}?action=refresh`,
      logout: `${AUTH_URL}?action=logout`,
      resetPassword: `${AUTH_URL}?action=reset-password`,
    },
  });

  if (showSettings) {
    return (
      <div className="pt-4">
        <SettingsContent onBack={() => setShowSettings(false)} />
      </div>
    );
  }

  if (auth.isAuthenticated && auth.user) {
    return (
      <div className="pt-4">
        <UserProfile
          user={auth.user}
          onLogout={auth.logout}
          onSettingsClick={() => setShowSettings(true)}
          isLoading={auth.isLoading}
          className="w-full"
        />
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="pt-4">
        <RegisterForm
          onRegister={auth.register}
          onVerifyEmail={auth.verifyEmail}
          onLoginClick={() => setView('login')}
          error={auth.error}
          isLoading={auth.isLoading}
          className="w-full"
        />
      </div>
    );
  }

  if (view === 'reset') {
    return (
      <div className="pt-4">
        <ResetPasswordForm
          onRequestReset={auth.requestPasswordReset}
          onResetPassword={auth.resetPassword}
          onBackToLogin={() => {
            setResetSuccess('Пароль успешно изменён');
            setView('login');
          }}
          error={auth.error}
          isLoading={auth.isLoading}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="pt-4">
      <LoginForm
        onLogin={auth.login}
        onRegisterClick={() => setView('register')}
        onForgotPasswordClick={() => setView('reset')}
        error={auth.error}
        successMessage={resetSuccess}
        isLoading={auth.isLoading}
        className="w-full"
      />
    </div>
  );
};

export default ProfileContent;
