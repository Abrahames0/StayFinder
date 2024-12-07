// src/navigation/Router.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationTabs from "./NavigationTabs"; // Tus pestañas actuales
import NavigationTabsA from "./NavigationTabsA";
import MessagesScreen from "../screens/MessagesScreen";
import ListMensajes from "@/components/mensajes/ListMensajes";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AgendarCitaScreen from "../screens/AgendarCitaScreen";
import Questionnaire from "../screens/Anfritrion/Questionnaire";
import AnunciosAnfitrionScreen from "../screens/Anfritrion/AnunciosAnfitrionScreen"; 

export type RootStackParamList = {
  Tabs: undefined; // Navegación de pestañas
  Chat: { chatRoomId: string }; // Ruta para el chat, con parámetro
  Perfil: undefined; // Ruta para configuración
  Mensajes: { chatRoomId: string; currentUserId: string; nameSelected: string };
  EditProfileScreen: undefined; // Ruta para configuración
  TabsAnfitrion: undefined; // 
  AgendarCita: { property: any };
  Questionnaire: undefined;
  Anuncios: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

const Router = ({ initialRoute = "Tabs" }: { initialRoute?: keyof RootStackParamList }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={NavigationTabs} />
      <Stack.Screen name="TabsAnfitrion" component={NavigationTabsA} />
      <Stack.Screen name="Chat" component={MessagesScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Mensajes" component={ListMensajes} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AgendarCita" component={AgendarCitaScreen} />
      <Stack.Screen name="Questionnaire" component={Questionnaire} />
      <Stack.Screen name="Anuncios" component={AnunciosAnfitrionScreen} />
    </Stack.Navigator>
  );
};

export default Router;
