// src/screens/EsqueciSenha.js
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

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState("");

  const handleRecovery = async () => {
    try {
      await api.post("/auth/recover", { email });
      Alert.alert("Sucesso", "Email de recuperação enviado!");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Erro", "Não foi possível recuperar a senha.");
    }
  };

  return (
    <Container>
      <Title>Recuperar Senha</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Button onPress={handleRecovery}>
        <ButtonText>Enviar</ButtonText>
      </Button>
    </Container>
  );
}
