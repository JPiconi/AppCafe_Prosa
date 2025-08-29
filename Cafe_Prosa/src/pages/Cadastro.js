import React, { useState, useContext } from "react";
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
import MaskInput, { Masks } from "react-native-mask-input";

export default function CadastroScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const validations = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
  };
  const allValid = Object.values(validations).every(Boolean);

  const handleCadastro = async () => {
    if (!username || !email || !senha || !confirmSenha || !cpf) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }
    if (!allValid) {
      Alert.alert("Erro", "A senha não atende todos os requisitos.");
      return;
    }
    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await register({ username, email, cpf, senha });
      navigation.replace("Home");
    } catch (e) {
      Alert.alert("Erro", "Erro ao cadastrar usuário.");
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

          {/* Nome + E-mail */}
          <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Senha + Confirmar Senha */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
              width: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Senha:</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
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
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Confirmar senha:</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  secureTextEntry={!showConfirmSenha}
                  value={confirmSenha}
                  onChangeText={setConfirmSenha}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 12 }}
                  onPress={() => setShowConfirmSenha(!showConfirmSenha)}
                >
                  <Ionicons
                    name={showConfirmSenha ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Requisitos de senha */}
          <View style={{ width: "100%", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 13,
                color: validations.length ? "green" : "red",
              }}
            >
              • Pelo menos 8 caracteres
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: validations.upper ? "green" : "red",
              }}
            >
              • Uma letra maiúscula
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: validations.lower ? "green" : "red",
              }}
            >
              • Uma letra minúscula
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: validations.number ? "green" : "red",
              }}
            >
              • Um número
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: validations.special ? "green" : "red",
              }}
            >
              • Um caractere especial
            </Text>
          </View>

          {/* CPF */}
          <View style={{ marginTop: 10, width: "100%" }}>
            <Text style={styles.label}>CPF:</Text>
            <MaskInput
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              keyboardType="numeric"
              mask={Masks.BRL_CPF}
              placeholder="000.000.000-00"
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
            <Text style={styles.btnText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
