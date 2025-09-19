// src/screens/Login.js
import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import {
  Container,
  Input,
  Button,
  ButtonText,
  Link,
  Title,
} from "../styles/styles";

export default function Login({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, senha);
    } catch {
      Alert.alert("Erro", "Credenciais inválidas");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <Link onPress={() => navigation.navigate("Cadastro")}>
        Criar conta
      </Link>
      <Link onPress={() => navigation.navigate("EsqueciSenha")}>
        Esqueci minha senha
      </Link>
    </Container>
  );
}
