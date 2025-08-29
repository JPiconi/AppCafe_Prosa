import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { homeStyles } from "../Styles/stylesHome";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(-220)).current;
  const [imageUri, setImageUri] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Alterna menu
  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? -220 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  // Escolher imagem de perfil
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão negada para acessar as fotos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View
      style={[homeStyles.container, darkMode && { backgroundColor: "#222" }]}
    >
      {/* Cabeçalho */}
      <View style={homeStyles.header}>
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

        <Text style={[homeStyles.userName, darkMode && { color: "#fff" }]}>
          {user?.username || "Usuário"}
        </Text>

        <TouchableOpacity style={homeStyles.menuButton} onPress={toggleMenu}>
          <Text style={{ fontSize: 30, color: darkMode ? "#fff" : "#fff" }}>
            ☰
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu lateral */}
      <Animated.View
        style={[
          homeStyles.sideMenu,
          { transform: [{ translateX: menuAnim }] },
          darkMode && { backgroundColor: "#333" },
        ]}
      >
        <Text style={[homeStyles.menuTitle, darkMode && { color: "#fff" }]}>
          Menu
        </Text>

        {/* Perfil */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text
            style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
          >
            Perfil: {user?.username || "Usuário"}
          </Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text
            style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
          >
            Email: {user?.email || ""}
          </Text>
        </TouchableOpacity>

        {/* Tema Escuro */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text
            style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
          >
            Tema Escuro
          </Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={homeStyles.menuItem} onPress={handleLogout}>
          <Text
            style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
          >
            🚪 Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Conteúdo principal */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18 }}>
          Bem-vindo, {user?.username || "Usuário"}!
        </Text>
        <Text
          style={{
            color: darkMode ? "#fff" : "#000",
            fontSize: 14,
            marginTop: 5,
          }}
        >
          Email: {user?.email || ""}
        </Text>
      </View>
    </View>
  );
}

//Teste
