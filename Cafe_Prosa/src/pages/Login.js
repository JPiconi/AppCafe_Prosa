// src/pages/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Styles/Styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const validations = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
  };

  const allValid = Object.values(validations).every(Boolean);

  const handleLogin = () => {
    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    if (!allValid) {
      alert("A senha não atende todos os requisitos.");
      return;
    }

    navigation.navigate("Home", {
      userEmail: email,
    });
  };

  const renderValidationItem = (label, valid) => (
    <Text
      key={label}
      style={{
        color: valid ? "green" : "red",
        textDecorationLine: valid ? "none" : "line-through",
        fontSize: 12,
        marginBottom: 2,
      }}
    >
      {label}
    </Text>
  );

  const getFirstInvalidValidation = () => {
    if (!validations.upper) return "Letra maiúscula";
    if (!validations.lower) return "Letra minúscula";
    if (!validations.number) return "Número";
    if (!validations.special) return "Caractere especial";
    if (!validations.length) return "Mínimo de 8 caracteres";
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Bem-vindo!</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {/* Mostrar validações uma por vez conforme digita */}
          {senha.length > 0 && (
            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              {(() => {
                const firstInvalid = getFirstInvalidValidation();
                if (firstInvalid) {
                  return renderValidationItem(firstInvalid, false);
                } else {
                  return (
                    <Text
                      style={{ color: "green", fontSize: 12, marginBottom: 2 }}
                    >
                      Senha válida!
                    </Text>
                  );
                }
              })()}
            </View>
          )}

          {/* Link para recuperar senha */}
          <TouchableOpacity onPress={() => navigation.navigate("EsqueciSenha")}>
            <Text style={{ color: "#888", fontSize: 14, marginBottom: 10 }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
