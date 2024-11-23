import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import ExploreScreen from '../screens/ExploreScreen';
import MapScreen from '../screens/MapScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';

type TabParamList = {
  Explorar: undefined;
  Mapa: undefined;
  Mensajes: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const NavigationTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'Explorar') {
          iconName = 'search';
        } else if (route.name === 'Mapa') {
          iconName = 'map';
        } else if (route.name === 'Mensajes') {
          iconName = 'chatbubble-outline';
        } else if (route.name === 'Perfil') {
          iconName = 'person-outline';
        } else {
          iconName = 'alert-circle'; // Valor por defecto
        }

        return {
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: '#D92AD9',
          tabBarInactiveTintColor: 'gray',
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
