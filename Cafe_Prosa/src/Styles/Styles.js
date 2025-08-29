// src/styles/styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcedd6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 170,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#381e14",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#402417",
    marginBottom: 15,
    color: "black",
  },
  btn: {
    marginTop: 25,
    backgroundColor: "#381e14",
    padding: 14,
    borderRadius: 80,
    width: "100%",
    alignItems: "center",
  },
  Logo: {
    width: 250,
    height: 250,
    marginBottom: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
