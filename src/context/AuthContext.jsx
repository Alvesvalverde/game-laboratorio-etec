import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'ALUNO' ou 'PROFESSOR', name: '...' }

  const logout = () => setUser(null);
  const login = (userData) => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};