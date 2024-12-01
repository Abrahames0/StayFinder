// src/navigation/Router.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationTabs from "./NavigationTabs"; // Tus pestañas actuales
import NavigationTabsA from "./NavigationTabsA";
import MessagesScreen from "../screens/MessagesScreen";
import ListMensajes from "@/components/mensajes/ListMensajes";
import ProfileScreen from "../screens/ProfileScreen";
import Contacts from "@/components/mensajes/Contacts";
import EditProfileScreen from "../screens/EditProfileScreen";


export type RootStackParamList = {
  Tabs: undefined; // Navegación de pestañas
  Chat: { chatRoomId: string }; // Ruta para el chat, con parámetro
  Perfil: undefined; // Ruta para configuración
  Mensajes: { chatRoomId: string; currentUserId: string, nameSelected: string};
  EditProfileScreen: undefined; // Ruta para configuración
  TabsAnfitrion : undefined; //
};

const Stack = createStackNavigator<RootStackParamList>();

const Router = ({ initialRoute = "Tabs" }: { initialRoute?: keyof RootStackParamList }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute} // Establecemos la ruta inicial
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={NavigationTabs} />
      <Stack.Screen name="TabsAnfitrion" component={NavigationTabsA} />
      <Stack.Screen name="Chat" component={MessagesScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Mensajes" component={ListMensajes} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};


export default Router;
