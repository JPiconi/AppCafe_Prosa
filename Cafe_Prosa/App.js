import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// Contexto
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

// Páginas
import Onboarding from "./src/pages/Onboarding";
import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";
import EsqueciSenha from "./src/pages/EsqueciSenha";
import Home from "./src/pages/Home";

const Stack = createNativeStackNavigator();

function Routes() {
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
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        </>
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
