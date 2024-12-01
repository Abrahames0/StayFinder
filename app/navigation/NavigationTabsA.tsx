import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import ExploreScreen from "../screens/ExploreScreen";
import MapScreen from "../screens/MapScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AnunciosAnfitrionScreen from "../screens/AnunciosAnfitrionScreen";
import InicioAnfitrionScreen from "../screens/InicioAnfitrionScreen"; 
import { Text } from "react-native";
import { styled } from "nativewind";
import { Usuario } from "@/src/models";

type TabParamList = {
  Inicio: undefined;
  Anuncios: undefined;
  Mensajes: { chatRoomId?: string };
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabText = styled(Text);

const NavigationTabsA = ( )  => {
 console.log("hola anfitrion");
 
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === "Inicio") {
          iconName = "home-outline";
        } else if (route.name === "Anuncios") {
          iconName = "megaphone-outline";
        } else if (route.name === "Mensajes") {
          iconName = "chatbubble-outline";
        } else if (route.name === "Perfil") {
          iconName = "person-outline";
        } else {
          iconName = "alert-circle";
        }

        return {
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name={iconName} size={28} color={color} />
          ),
          tabBarActiveTintColor: "#DF96F9",
          tabBarInactiveTintColor: "#7a7a7a", 
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 76,
            paddingTop: 10,
            paddingBottom: 10,
          },
          tabBarLabel: ({ focused, color }) => (
            <TabText
              className={`text-gray-950 text-xs font-medium`}>
              {route.name}
            </TabText>
          ),
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Inicio" component={InicioAnfitrionScreen} />
      <Tab.Screen name="Anuncios" component={AnunciosAnfitrionScreen} />
      <Tab.Screen name="Mensajes" component={MessagesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default NavigationTabsA;