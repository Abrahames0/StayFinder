import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import ExploreScreen from "../screens/ExploreScreen";
import MapScreen from "../screens/MapScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Text } from "react-native";
import { styled } from "nativewind";

type TabParamList = {
  Explorar: undefined;
  Mapa: undefined;
  Mensajes: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabText = styled(Text);

const NavigationTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === "Explorar") {
          iconName = "search";
        } else if (route.name === "Mapa") {
          iconName = "map";
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
      <Tab.Screen name="Explorar" component={ExploreScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Mensajes" component={MessagesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default NavigationTabs;