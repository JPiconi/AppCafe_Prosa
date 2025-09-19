// src/screens/Cadastro.js
import React, { useState } from "react";
import { Alert } from "react-native";
import api from "../services/api";
import {
  Container,
  Input,
  Button,
  ButtonText,
  Title,
} from "../styles/styles";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    try {
      await api.post("/auth/register", { nome, email, senha });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  return (
    <Container>
      <Title>Cadastrar</Title>
      <Input placeholder="Nome" value={nome} onChangeText={setNome} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button onPress={handleCadastro}>
        <ButtonText>Criar conta</ButtonText>
      </Button>
    </Container>
  );
}
