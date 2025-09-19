// src/navigation/Routes.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import EsqueciSenha from "../screens/EsqueciSenha";
import Onboarding from "../screens/Onboarding";
import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!signed ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
