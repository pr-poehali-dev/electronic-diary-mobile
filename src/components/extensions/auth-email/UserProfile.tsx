/**
 * Auth Email Extension - User Profile
 *
 * Компонент отображения данных пользователя после входа.
 */
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface User {
  id: number;
  email: string;
  name: string | null;
  email_verified?: boolean;
}

interface UserProfileProps {
  user: User;
  onLogout: () => Promise<void>;
  onSettingsClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function UserProfile({
  user,
  onLogout,
  onSettingsClick,
  isLoading = false,
  className = "",
}: UserProfileProps): React.ReactElement {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    () => localStorage.getItem(`avatar_${user.id}`)
  );
  const [school, setSchool] = useState(
    () => localStorage.getItem(`school_${user.id}`) || ""
  );
  const [grade, setGrade] = useState(
    () => localStorage.getItem(`grade_${user.id}`) || ""
  );
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarUrl(result);
      localStorage.setItem(`avatar_${user.id}`, result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(`school_${user.id}`, school);
    localStorage.setItem(`grade_${user.id}`, grade);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4 relative w-fit mx-auto">
          <Avatar className="h-24 w-24">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 bg-white border border-border rounded-full p-1.5 shadow-sm hover:bg-gray-50"
          >
            <Icon name="Camera" size={14} className="text-gray-600" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <CardTitle className="text-xl">{user.name || "Пользователь"}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="school">Школа</Label>
          <Input
            id="school"
            placeholder="Например: МБОУ СОШ №5"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">Класс</Label>
          <Input
            id="grade"
            placeholder="Например: 9А"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSave}
        >
          {saved ? "Сохранено!" : "Сохранить"}
        </Button>

        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="truncate max-w-[180px]">{user.email}</span>
          </div>
          {user.email_verified !== undefined && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Статус</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                user.email_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {user.email_verified ? "Подтверждён" : "Не подтверждён"}
              </span>
            </div>
          )}
        </div>

        {/* ID аккаунта */}
        <div
          style={{
            background: 'rgba(220,38,38,0.07)',
            border: '1px solid rgba(220,38,38,0.18)',
            borderRadius: 14,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: 11, color: 'rgba(30,10,10,0.45)', marginBottom: 2 }}>Мой ID аккаунта</p>
            <p style={{ fontWeight: 700, fontSize: 20, color: '#dc2626', letterSpacing: '0.04em' }}>#{user.id}</p>
          </div>
          <button
            type="button"
            onClick={() => { navigator.clipboard.writeText(String(user.id)); }}
            title="Скопировать ID"
            style={{
              background: 'rgba(220,38,38,0.12)',
              border: '1px solid rgba(220,38,38,0.22)',
              borderRadius: 10,
              padding: '6px 10px',
              color: '#dc2626',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="Copy" size={13} />
            Копировать
          </button>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        {onSettingsClick && (
          <Button
            variant="outline"
            className="w-full"
            onClick={onSettingsClick}
          >
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full text-red-500 border-red-200 hover:bg-red-50"
          onClick={onLogout}
          disabled={isLoading}
        >
          {isLoading ? "Выход..." : "Выйти из аккаунта"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserProfile;