// src/screens/Home.js
import React, { useContext } from "react";
import { Container, Title, Button, ButtonText } from "../styles/styles";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <Container>
      <Title>Olá, {user?.nome || "Usuário"}!</Title>
      <Button onPress={signOut}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}
