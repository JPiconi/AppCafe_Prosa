// // src/pages/Home.js
// import React, { useState, useRef, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Animated,
//   Switch,
//   Pressable,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../context/AuthContext";
// import { homeStyles } from "../Styles/stylesHome";

// ///////////////////////
// export default function App() {
//   const scrollRef = useRef();

//   const sections = {
//     quentes: 0,
//     gelados: 400, // posição em pixels (ajustar conforme conteúdo real)
//     salgados: 800,
//   };

//   const scrollToSection = (section) => {
//     scrollRef.current.scrollTo({ y: sections[section], animated: true });
//   };
// ////////////////////////

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const { user, logout } = useContext(AuthContext);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuAnim = useRef(new Animated.Value(-220)).current;
//   const [imageUri, setImageUri] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleMenu = () => {
//     Animated.timing(menuAnim, {
//       toValue: menuOpen ? -220 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//     setMenuOpen(!menuOpen);
//   };

//   // ✅ ImagePicker atualizado (sem warning)
//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("Permissão negada para acessar as fotos!");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: [ImagePicker.MediaType.Images], // ✅ correção
//       quality: 1,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const handleLogout = async () => {
//     await logout();
//     navigation.replace("Login");
//   };

//   return (
//     <View
//       style={[homeStyles.container, darkMode && { backgroundColor: "#222" }]}
//     >
//       {/* Cabeçalho */}
//       <View style={homeStyles.header}>
//         <TouchableOpacity onPress={pickImage}>
//           <Image
//             source={
//               imageUri
//                 ? { uri: imageUri }
//                 : require("../assets/images/profile.jpg")
//             }
//             style={homeStyles.profileImage}
//           />
//         </TouchableOpacity>

//         <Text style={[homeStyles.userName, darkMode && { color: "#fff" }]}>
//           {user?.username || "Usuário"}
//         </Text>

//         <TouchableOpacity style={homeStyles.menuButton} onPress={toggleMenu}>
//           <Text style={{ fontSize: 30, color: darkMode ? "#fff" : "#fff" }}>
//             ☰
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Menu lateral */}
//       <Animated.View
//         style={[
//           homeStyles.sideMenu,
//           { transform: [{ translateX: menuAnim }] },
//           darkMode && { backgroundColor: "#333" },
//         ]}
//       >
//         <Text style={[homeStyles.menuTitle, darkMode && { color: "#fff" }]}>
//           Menu
//         </Text>

//         {/* Perfil */}
//         <TouchableOpacity style={homeStyles.menuItem}>
//           <Text
//             style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
//           >
//             Perfil
//           </Text>
//         </TouchableOpacity>

//         {/* Email */}
//         <TouchableOpacity style={homeStyles.menuItem}>
//           <Text
//             style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
//           >
//             Email: {user?.email || "não informado"}
//           </Text>
//         </TouchableOpacity>

//         {/* Tema Escuro */}
//         <TouchableOpacity style={homeStyles.menuItem}>
//           <Text
//             style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
//           >
//             Tema Escuro
//           </Text>
//           <Switch value={darkMode} onValueChange={setDarkMode} />
//         </TouchableOpacity>

//         {/* Logout */}
//         <TouchableOpacity style={homeStyles.menuItem} onPress={handleLogout}>
//           <Text
//             style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
//           >
//             🚪 Logout
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>

//       <View style={{ flex: 1 }}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => scrollToSection("quentes")}>
//             <Text style={styles.headerText}>Cafés Quentes</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => scrollToSection("gelados")}>
//             <Text style={styles.headerText}>Cafés Gelados</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => scrollToSection("salgados")}>
//             <Text style={styles.headerText}>Salgados</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Cardápio */}
//         <ScrollView ref={scrollRef}>
//           <View style={styles.section}>
//             <Text style={styles.title}>☕ Cafés Quentes</Text>
//             <Text>Expresso</Text>
//             <Text>Capuccino</Text>
//             <Text>Mocha</Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.title}>🥤 Cafés Gelados</Text>
//             <Text>Iced Latte</Text>
//             <Text>Cold Brew</Text>
//             <Text>Frappuccino</Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.title}>🥐 Salgados</Text>
//             <Text>Coxinha</Text>
//             <Text>Pão de queijo</Text>
//             <Text>Empada</Text>
//           </View>
//         </ScrollView>
//       </View>

//       {/* Conteúdo principal */}
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18 }}>
//           Bem-vindo, {user?.username || "Usuário"}!
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#cfcfcf",
//     paddingVertical: 12,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   section: {
//     height: 400, // altura fictícia para exemplo
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });







// src/pages/Home.js
import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { homeStyles } from "../Styles/stylesHome";

///////////////////////
export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(-220)).current;
  const [imageUri, setImageUri] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const scrollRef = useRef();

  const sections = {
    quentes: 0,
    gelados: 400, // posição em pixels (ajustar conforme conteúdo real)
    salgados: 800,
  };

  const scrollToSection = (section) => {
    scrollRef.current.scrollTo({ y: sections[section], animated: true });
  };

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? -220 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  // ✅ ImagePicker atualizado (sem warning)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão negada para acessar as fotos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      quality: 1,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

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
            Perfil
          </Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={homeStyles.menuItem}>
          <Text
            style={[homeStyles.menuItemText, darkMode && { color: "#fff" }]}
          >
            Email: {user?.email || "não informado"}
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

      {/* Header do Cardápio */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => scrollToSection("quentes")}>
          <Text style={styles.headerText}>Cafés Quentes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => scrollToSection("gelados")}>
          <Text style={styles.headerText}>Cafés Gelados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => scrollToSection("salgados")}>
          <Text style={styles.headerText}>Salgados</Text>
        </TouchableOpacity>
      </View>

      {/* Cardápio */}
      <ScrollView ref={scrollRef}>
        <View style={styles.section}>
          <Text style={styles.title}>☕ Cafés Quentes</Text>
          <Text>Expresso</Text>
          <Text>Capuccino</Text>
          <Text>Mocha</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>🥤 Cafés Gelados</Text>
          <Text>Iced Latte</Text>
          <Text>Cold Brew</Text>
          <Text>Frappuccino</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>🥐 Salgados</Text>
          <Text>Coxinha</Text>
          <Text>Pão de queijo</Text>
          <Text>Empada</Text>
        </View>
      </ScrollView>

      {/* Conteúdo principal */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 18 }}>
          Bem-vindo, {user?.username || "Usuário"}!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#a85311",
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    height: 400, // altura fictícia para exemplo
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
