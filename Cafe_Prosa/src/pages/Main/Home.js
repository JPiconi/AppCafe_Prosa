// src/screens/Home.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.welcome}>☕ Bem-vindo ao Café Prosa!</Text>
        <Text style={styles.subtitle}>Seu espaço de aconchego</Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Menu Rápido</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="cafe-outline" size={32} color="#fff" />
            <Text style={styles.menuText}>Cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={32} color="#fff" />
            <Text style={styles.menuText}>Reservas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="gift-outline" size={32} color="#fff" />
            <Text style={styles.menuText}>Promoções</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="chatbubbles-outline" size={32} color="#fff" />
            <Text style={styles.menuText}>Contato</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Novidades</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            🌟 Experimente nosso novo café especial da semana com desconto
            exclusivo!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEA369",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#C45306",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#f2f2f2",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#330A05",
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    height: 100,
    backgroundColor: "#761305",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  menuText: {
    color: "#fff",
    marginTop: 5,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  cardText: {
    color: "#550F05",
    fontSize: 14,
  },
});
