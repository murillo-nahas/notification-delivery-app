import { createContext, type ReactNode, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

    return jwtDecode<AuthUser>(token);
  });

  const login = (token: string): void => {
    localStorage.setItem("accessToken", token);

    setUser(jwtDecode<AuthUser>(token));
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");

    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
