// src/pages/Cadastro.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CadastroScreen() {
  // Estados para os campos
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");

  const navigation = useNavigation();

  // Função para validar email
  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Validações da senha
  const validations = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
  };

  const allValid = Object.values(validations).every(Boolean);

  // Retorna primeiro critério inválido
  const getFirstInvalidValidation = () => {
    if (!validations.upper) return "Letra maiúscula";
    if (!validations.lower) return "Letra minúscula";
    if (!validations.number) return "Número";
    if (!validations.special) return "Caractere especial";
    if (!validations.length) return "Mínimo de 8 caracteres";
    return null;
  };

  // Exibe texto de validação
  const renderValidationItem = (label, valid) => (
    <Text
      key={label}
      style={{
        color: valid ? "green" : "red",
        fontSize: 12,
        marginBottom: 2,
      }}
    >
      {label}
    </Text>
  );

  // Função para cadastro
  const handleCadastro = async () => {
    if (!username || !email || !senha || !confirmSenha || !cpf) {
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

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", username);
      await AsyncStorage.setItem("userCPF", cpf);

      navigation.navigate("Home", {
        userEmail: email,
        userName: username,
        userCPF: cpf,
      });
    } catch (e) {
      alert("Erro ao salvar dados.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.Logo}
            resizeMode="contain"
          />

          {/* Linha: Nome + Email */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#381e14"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#381e14"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Linha: Senha + Confirmar senha */}
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#381e14"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Confirmar senha:</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#381e14"
                secureTextEntry
                value={confirmSenha}
                onChangeText={setConfirmSenha}
              />
            </View>
          </View>

          {/* Campo CPF */}
          <View style={{ marginTop: 10, width: "100%" }}>
            <Text style={styles.label}>CPF:</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#381e14"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>

          {/* Validação da senha */}
          {senha.length > 0 && (
            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              {(() => {
                const firstInvalid = getFirstInvalidValidation();
                if (firstInvalid) {
                  return renderValidationItem(firstInvalid, false);
                } else {
                  return (
                    <Text style={{ color: "green", fontSize: 12 }}>
                      Senha válida!
                    </Text>
                  );
                }
              })()}
            </View>
          )}

          {/* Botão */}
          <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
            <Text style={styles.btnText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
