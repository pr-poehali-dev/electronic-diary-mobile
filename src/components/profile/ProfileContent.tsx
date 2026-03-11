import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProfileContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setError('');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogin('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="pt-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-diary-red flex items-center justify-center">
            <Icon name="User" size={40} className="text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{login}</h2>
            <p className="text-muted-foreground text-sm">Ученик</p>
          </div>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 py-2">
              <Icon name="User" size={18} className="text-muted-foreground" />
              <span className="text-sm">Личные данные</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </div>
            <div className="flex items-center gap-3 py-2 border-t">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="text-sm">Уведомления</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </div>
            <div className="flex items-center gap-3 py-2 border-t">
              <Icon name="Shield" size={18} className="text-muted-foreground" />
              <span className="text-sm">Безопасность</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full text-red-500 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon name="UserCircle" size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold">Войдите в аккаунт</h2>
        <p className="text-muted-foreground text-sm text-center">
          Введите данные от личного кабинета школы
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Вход</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full bg-diary-red hover:bg-diary-red/90 text-white">
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContent;
