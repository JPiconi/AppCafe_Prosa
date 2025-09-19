// src/screens/Onboarding.js
import React from "react";
import { ButtonText, Container, Title, Button } from "../styles/styles";

export default function Onboarding({ navigation }) {
  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Button onPress={() => navigation.navigate("Login")}>
        <ButtonText>Começar</ButtonText>
      </Button>
    </Container>
  );
}
