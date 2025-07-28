// utils/useUser.ts
import { useEffect, useState } from 'react';

const USER_KEY = 'goshary_user';

export type User = {
  name: string;
  email: string;
};

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return { user, login, logout };
}
