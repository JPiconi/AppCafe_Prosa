import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

export default function Perfil() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={90} color="#fff" />
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.email}>{user?.email || "Usuário"}</Text>
      </View>

      {/* Opções de Perfil */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings-outline" size={24} color="#330A05" />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#330A05" />
          <Text style={styles.optionText}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEA369",
  },
  header: {
    backgroundColor: "#C45306",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#f2f2f2",
    marginTop: 5,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#330A05",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#761305",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
});
