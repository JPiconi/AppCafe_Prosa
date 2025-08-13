// src/pages/EsqueciSenha.js

// Importa o React e o hook useState para gerenciar estado (variáveis reativas)
import React, { useState } from "react";

// Importa componentes da interface do React Native
import {
  View, // Contêiner de layout
  Text, // Texto comum
  TextInput, // Campo de entrada de texto
  TouchableOpacity, // Botão com toque
  Alert, // Caixa de alerta nativa
} from "react-native";

// Hook de navegação para trocar de telas
import { useNavigation } from "@react-navigation/native";

// Importa os estilos globais da aplicação
import { styles } from "../Styles/styles";

// Função principal do componente (tela) de recuperação de senha
export default function EsqueciSenha() {
  // Estado que armazena o e-mail digitado
  const [email, setEmail] = useState("");

  // Hook que permite voltar ou navegar entre telas
  const navigation = useNavigation();

  // Função executada quando o usuário pressiona "Enviar"
  const handleReset = () => {
    // Se o campo de e-mail estiver vazio, mostra um alerta
    if (!email) {
      Alert.alert("Erro", "Digite seu e-mail.");
      return;
    }

    // Exibe mensagem de sucesso com o e-mail informado
    Alert.alert(
      "Senha enviada",
      `Um e-mail para redefinir a senha foi enviado para ${email}.`
    );

    // Volta para a tela anterior (login, por exemplo)
    navigation.goBack();
  };

  // Renderização da interface
  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Recuperar Senha</Text>

      {/* Campo de entrada do e-mail */}
      <TextInput
        style={styles.input} // Estilo do input
        placeholder="Digite seu e-mail" // Texto de dica
        placeholderTextColor="#888" // Cor do placeholder
        keyboardType="email-address" // Teclado com @ e .
        value={email} // Valor atual do input
        onChangeText={setEmail} // Atualiza o estado ao digitar
      />

      {/* Botão de envio */}
      <TouchableOpacity style={styles.btn} onPress={handleReset}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      {/* Botão para voltar à tela anterior */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "#888", fontSize: 14, marginTop: 10 }}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
