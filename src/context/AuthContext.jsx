import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const currentUser = await authService.getCurrentUser(data.access);
    setUser(currentUser);
  };

  const register = async (userData) => {
    await authService.register(userData);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}