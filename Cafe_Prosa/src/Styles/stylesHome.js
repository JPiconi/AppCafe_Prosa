import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fcedd6" },
  header: {
    height: 125,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    position: "relative",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#7A5445",
  },
  userName: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 8 },
  menuButton: { position: "absolute", right: 15, top: 50 },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemText: { fontSize: 16 },
});
