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

  const login = async ({ email, senha }) => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (!storedUser) throw new Error("Usuário não cadastrado");

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.email !== email) {
        throw new Error("Usuário não cadastrado");
      }
      if (parsedUser.senha !== senha) {
        throw new Error("Usuário ou senha incorretos");
      }

      setUser(parsedUser);
      return parsedUser;
    } catch (err) {
      throw err;
    }
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
