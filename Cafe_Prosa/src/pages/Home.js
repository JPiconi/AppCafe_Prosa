// Importações principais do React e hooks de estado e referência
import React, { useState, useRef } from "react";

// Importação de componentes visuais do React Native
import {
  View, // Contêiner de layout
  Text, // Texto na tela
  Image, // Imagem (foto de perfil, galeria etc.)
  TouchableOpacity, // Botão que pode ser pressionado
  ScrollView, // Área com rolagem
  Animated, // Componente para animações
} from "react-native";

// Importa biblioteca para seleção de imagens da galeria
import * as ImagePicker from "expo-image-picker";

// Hooks de navegação para mudar de telas
import { useNavigation, useRoute } from "@react-navigation/native";

// Importa estilos visuais externos específicos para esta tela
import { homeStyles } from "../Styles/stylesHome";
// Componente principal da tela inicial
export default function HomeScreen() {
  // Acessa os parâmetros da rota (dados do login)
  const route = useRoute();

  // Hook para navegação entre telas
  const navigation = useNavigation();

  // Extrai nome e e-mail passados pela tela de login (com valores padrão caso não venham)
  const { userName = "Usuário", email = "usuario@email.com" } =
    route.params || {};

  // Estado que armazena o URI da imagem de perfil escolhida
  const [imageUri, setImageUri] = useState(null);

  // Estado que controla se o menu lateral está aberto ou não
  const [menuOpen, setMenuOpen] = useState(false);

  // Referência de animação para mover o menu lateral (começa fora da tela)
  const menuAnim = useRef(new Animated.Value(-220)).current;

  // Função para abrir/fechar o menu com animação
  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? -220 : 0, // Move o menu para dentro ou fora da tela
      duration: 300, // Duração da animação em milissegundos
      useNativeDriver: true, // Usa o driver nativo para melhor desempenho
    }).start();

    // Atualiza o estado de visibilidade do menu
    setMenuOpen(!menuOpen);
  };

  // Função para abrir a galeria e selecionar uma imagem
  const pickImage = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Se o usuário negar, exibe alerta
    if (status !== "granted") {
      alert("Permissão negada para acessar as fotos!");
      return;
    }

    // Abre a galeria e permite seleção de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Só permite imagens
      quality: 1, // Qualidade máxima
    });

    // Se o usuário selecionou uma imagem, atualiza o estado com o URI
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Lista de fotos para exibir na rolagem da página
  const photos = [
    require("../assets/images/photo1.jpg"),
    require("../assets/images/photo2.jpg"),
    require("../assets/images/photo3.jpg"),
    require("../assets/images/photo4.jpg"),
    require("../assets/images/photo5.jpg"),
  ];

  // Renderização do componente
  return (
    <View style={{ flex: 1 }}>
      {/* CABEÇALHO DA TELA */}
      <View style={homeStyles.header}>
        {/* Imagem de perfil (pode ser clicada para trocar) */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require("../assets/images/profile.jpg")
            }
            style={homeStyles.profileImage}
          />
        </TouchableOpacity>

        {/* Nome do usuário */}
        <Text style={homeStyles.userName}>{userName}</Text>

        {/* Botão do menu hambúrguer (☰) */}
        <TouchableOpacity style={homeStyles.menuButton} onPress={toggleMenu}>
          <Text style={{ fontSize: 30, color: "white" }}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* MENU LATERAL COM ANIMAÇÃO */}
      <Animated.View
        style={[
          homeStyles.sideMenu,
          {
            transform: [{ translateX: menuAnim }], // Aplica a animação horizontal
          },
        ]}
      >
        {/* Título do menu */}
        <Text style={homeStyles.menuTitle}>Menu</Text>

        {/* Opção de voltar para login */}
        <TouchableOpacity
          style={homeStyles.menuItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={homeStyles.menuItemText}> Voltar para Login</Text>
        </TouchableOpacity>

        {/* Informações do usuário logado */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text style={homeStyles.menuItemText}> Conta: {userName}</Text>
          <Text style={homeStyles.menuItemText}> {email}</Text>
        </TouchableOpacity>

        {/* Opção fictícia de troca de senha */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text style={homeStyles.menuItemText}>Trocar Senha</Text>
        </TouchableOpacity>

        {/* Opção fictícia de configurações */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text style={homeStyles.menuItemText}> Configurações</Text>
        </TouchableOpacity>

        {/* Logout: volta para a tela de login e fecha o menu */}
        <TouchableOpacity
          style={homeStyles.menuItem}
          onPress={() => {
            setMenuOpen(false); // Fecha o menu
            navigation.navigate("Login"); // Vai para login
          }}
        >
          <Text style={homeStyles.menuItemText}>🚪 Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* SCROLL COM AS FOTOS */}
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        {/* Mapeia as fotos e exibe cada uma */}
        {photos.map((photo, index) => (
          <Image
            key={index} // Chave única para cada imagem
            source={photo} // Caminho da imagem
            style={homeStyles.scrollImage} // Estilo da imagem
            resizeMode="cover" // Imagem cobre o espaço mantendo proporção
          />
        ))}
      </ScrollView>
    </View>
  );
}
