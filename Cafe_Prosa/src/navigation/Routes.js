import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

// Telas
import Onboarding from "../pages/Common/Onboarding";
import Login from "../pages/Auth/Login";
import Cadastro from "../pages/Auth/Cadastro";
import EsqueciSenha from "../pages/Auth/EsqueciSenha";
import Home from "../pages/Main/Home";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#381e14" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      )}
    </Stack.Navigator>
  );
}
