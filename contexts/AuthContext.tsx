// contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface User {
  id: string;
  email: string;
  // Přidejte další vlastnosti uživatele, které potřebujete
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// Vytvoření kontextu s výchozí hodnotou
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Vytvoření "Provider" komponenty, která bude držet logiku
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Pro kontrolu počátečního načítání

  // Při prvním načtení aplikace zkusíme zjistit, zda uživatel není přihlášený
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await fetch('/api/auth/me'); // Endpoint, který vrátí přihlášeného uživatele
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Nepodařilo se ověřit session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }); // Zavoláme API pro odhlášení
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Vytvoření vlastního hooku pro snadnější použití kontextu
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth musí být použit uvnitř AuthProvider');
  }
  return context;
};
