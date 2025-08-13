// src/pages/Cadastro.js

// Importa o React e o hook useState para manipular estados locais
import React, { useState } from "react";

// Importa componentes essenciais da interface do React Native
import {
  View, // Container visual de layout
  Text, // Texto simples
  TextInput, // Campo de entrada de texto
  TouchableOpacity, // Botão que responde ao toque
  ScrollView, // Permite rolagem da tela
  KeyboardAvoidingView, // Impede que o teclado sobreponha os campos
  Platform, // Detecta o sistema operacional
} from "react-native";

// Importa o hook de navegação
import { useNavigation } from "@react-navigation/native";

// Importa estilos visuais definidos separadamente
import { styles } from "../Styles/Styles";

// Importa biblioteca para armazenamento local assíncrono
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função principal do componente da tela de Cadastro
export default function CadastroScreen() {
  // Define estados para armazenar os dados digitados
  const [username, setUsername] = useState(""); // Nome de usuário
  const [email, setEmail] = useState(""); // E-mail
  const [senha, setSenha] = useState(""); // Senha

  // Hook de navegação para transição entre telas
  const navigation = useNavigation();

  // Função para validar e-mail com regex
  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Conjunto de validações da senha
  const validations = {
    length: senha.length >= 8, // Pelo menos 8 caracteres
    upper: /[A-Z]/.test(senha), // Pelo menos uma letra maiúscula
    lower: /[a-z]/.test(senha), // Pelo menos uma letra minúscula
    number: /[0-9]/.test(senha), // Pelo menos um número
    special: /[!@#$%^&*(),.?":{}|<>]/.test(senha), // Pelo menos um caractere especial
  };

  // Verifica se todas as validações retornam true
  const allValid = Object.values(validations).every(Boolean);

  // Função chamada ao pressionar o botão de cadastro
  const handleCadastro = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!username || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    // Valida o formato do e-mail
    if (!isEmailValid(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    // Valida a força da senha
    if (!allValid) {
      alert("A senha não atende todos os requisitos.");
      return;
    }

    try {
      // Salva o e-mail e nome de usuário localmente no AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", username);

      // Navega para a tela Home e envia os dados
      navigation.navigate("Home", {
        userEmail: email,
        userName: username,
      });
    } catch (e) {
      // Mostra erro caso o salvamento falhe
      alert("Erro ao salvar dados.");
    }
  };

  // Função que mostra a mensagem de validação (verde/vermelha)
  const renderValidationItem = (label, valid) => (
    <Text
      key={label}
      style={{
        color: valid ? "green" : "red", // Verde se válido, vermelho se inválido
        textDecorationLine: valid ? "none" : "line-through", // Riscado se inválido
        fontSize: 12,
        marginBottom: 2,
      }}
    >
      {label}
    </Text>
  );

  // Retorna o primeiro critério de senha que não foi atendido
  const getFirstInvalidValidation = () => {
    if (!validations.upper) return "Letra maiúscula";
    if (!validations.lower) return "Letra minúscula";
    if (!validations.number) return "Número";
    if (!validations.special) return "Caractere especial";
    if (!validations.length) return "Mínimo de 8 caracteres";
    return null; // Se todos estiverem válidos
  };

  // Renderiza a interface da tela
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adapta para iOS ou Android
    >
      {/* Área rolável para evitar que o teclado esconda os campos */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Título de boas-vindas */}
          <Text style={styles.title}>Bem-vindo!</Text>

          {/* Campo: Nome de usuário */}
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          {/* Campo: E-mail */}
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#888"
            keyboardType="email-address" // Ativa teclado com @
            value={email}
            onChangeText={setEmail}
          />

          {/* Campo: Senha */}
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry // Oculta o texto da senha
            value={senha}
            onChangeText={setSenha}
          />

          {/* Mostra validações da senha conforme usuário digita */}
          {senha.length > 0 && (
            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              {(() => {
                // Pega o primeiro critério não atendido
                const firstInvalid = getFirstInvalidValidation();
                if (firstInvalid) {
                  // Mostra regra pendente em vermelho
                  return renderValidationItem(firstInvalid, false);
                } else {
                  // Senha válida: mensagem verde
                  return (
                    <Text
                      style={{ color: "green", fontSize: 12, marginBottom: 2 }}
                    >
                      Senha válida!
                    </Text>
                  );
                }
              })()}
            </View>
          )}

          {/* Botão de cadastro */}
          <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
