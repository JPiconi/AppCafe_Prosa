// src/pages/StartScreen.js

// Importa o React, necessário para qualquer componente React
import React from "react";

// Importa componentes visuais do React Native
import {
  View, // Container de layout
  Text, // Exibição de texto
  TouchableOpacity, // Botão com resposta ao toque
  Image, // Exibe imagens
} from "react-native";

// Importa o hook de navegação para mudar de telas
import { useNavigation } from "@react-navigation/native";

// Importa os estilos personalizados definidos no arquivo styles.js
import { styles } from "../Styles/styles";

// Função principal do componente StartScreen (tela inicial)
export default function Onboarding() {
  // Cria uma instância de navegação para usar nas ações de toque
  const navigation = useNavigation();

  // A função retorna a interface visual da tela inicial
  return (
    <View style={styles.container}>
      {/* Logo do app */}
      <Image
        source={require("../assets/images/Logo.png")} // Caminho da sua logo
        style={styles.Logo}
        resizeMode="contain"
      />

      {/* Botão para ir até a tela de Login */}
      <TouchableOpacity
        style={styles.btn} // Estilo do botão
        onPress={() => navigation.navigate("Login")} // Ação ao pressionar
      >
        <Text style={styles.btnText}>Fazer Login</Text>
      </TouchableOpacity>

      {/* Botão para ir até a tela de Cadastro */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.btnText}>Fazer Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}
