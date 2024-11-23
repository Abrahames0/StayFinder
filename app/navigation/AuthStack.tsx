import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Auth/LoginScreen';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
