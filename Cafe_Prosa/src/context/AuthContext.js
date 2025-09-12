// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário salvo no AsyncStorage quando o app abre
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Função de login (conecta com backend)
  const login = async ({ email, senha }) => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro no login");

      const userData = { email, token: data.token };
      setUser(userData);
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Função de cadastro (conecta com backend)
  const register = async ({ nome, email, senha }) => {
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro no cadastro");

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Logout: limpa AsyncStorage e contexto
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
