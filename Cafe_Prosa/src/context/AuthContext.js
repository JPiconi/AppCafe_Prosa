import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    // Garantir que o objeto tenha todas as propriedades esperadas
    const fullUser = {
      username: userData.username || "Usuário",
      email: userData.email,
      cpf: userData.cpf || "",
      senha: userData.senha,
    };
    setUser(fullUser);
    await AsyncStorage.setItem("@user", JSON.stringify(fullUser));
  };

  const register = async (userData) => {
    const fullUser = {
      username: userData.username,
      email: userData.email,
      cpf: userData.cpf,
      senha: userData.senha,
    };
    setUser(fullUser);
    await AsyncStorage.setItem("@user", JSON.stringify(fullUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
