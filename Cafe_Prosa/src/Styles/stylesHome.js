import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  menuButton: {
    position: "absolute",
    right: 15,
    top: 50,
  },
  scrollContainer: {
    padding: 10,
    alignItems: "center",
  },
  scrollImage: {
    width: "100%",
    height: 250,
    marginBottom: 15,
    borderRadius: 10,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 220,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 15,
    elevation: 10,
    zIndex: 999,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingBottom: 5,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
});
