import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Admin User",
    avatar: "/default-avatar.png",
    role: "admin"
  });

  const logout = () => {
    // In a real app, you would handle actual logout logic here
    setUser(null);
  };

  const login = (credentials) => {
    // In a real app, you would handle actual login logic here
    setUser({
      name: "Admin User",
      avatar: "/default-avatar.png",
      role: "admin"
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}