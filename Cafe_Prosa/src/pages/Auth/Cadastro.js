// src/screens/Cadastro.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      await register({ nome, email, senha });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro no cadastro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#550F05" />
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#761305"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#550F05" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#761305"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#550F05" />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#761305"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já tem conta? Entre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEA369",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#330A05",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#550F05",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#C45306",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#330A05",
  },
  button: {
    backgroundColor: "#761305",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#9D3306",
    fontSize: 14,
  },
});
