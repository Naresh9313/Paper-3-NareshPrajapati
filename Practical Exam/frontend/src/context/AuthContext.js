import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("userId") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (tokenValue, userId) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("userId", userId);
    setToken(tokenValue);
    setUser(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
