import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Styles/styles";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const navigation = useNavigation();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigation.replace("Home");
  }, [user]);

  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }
    if (senha.length < 8) {
      Alert.alert("Erro", "Senha inválida.");
      return;
    }

    try {
      await login({
        username: "Usuário", // Definindo nome default para evitar erro
        email,
        cpf: "",
        senha,
      });
      navigation.replace("Home");
    } catch (e) {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.Logo}
            resizeMode="contain"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View
            style={{ position: "relative", width: "100%", marginBottom: 15 }}
          >
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Digite sua senha"
              secureTextEntry={!showSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 12 }}
              onPress={() => setShowSenha(!showSenha)}
            >
              <Ionicons
                name={showSenha ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("EsqueciSenha")}>
            <Text style={{ color: "#381e14", fontSize: 14, marginBottom: 10 }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.btnText}>Fazer Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
