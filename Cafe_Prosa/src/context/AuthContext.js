import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://10.0.2.2:3000", // se usar emulador android
    // baseURL: "http://localhost:3000", // se rodar no web
  });

  const login = async (email, senha) => {
    try {
      const res = await api.post("/auth/login", { email, senha });
      const { token } = res.data;

      await SecureStore.setItemAsync("token", token);
      setUser(jwtDecode(token));
    } catch (err) {
      console.log("Erro no login:", err.response?.data || err.message);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  const checkLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setUser(jwtDecode(token));
      }
    } catch (e) {
      console.log("Erro ao verificar login:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
