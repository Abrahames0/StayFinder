import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react-native";
import awsconfig from "../src/amplifyconfiguration.json";
import NavigationTabs from "./navigation/NavigationTabs"; // Navegación principal
import RegisterScreen from "./screens/RegisterScreen"; // Pantalla de registro
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "../src/models";

Amplify.configure(awsconfig);

const AppContent = () => {
  useEffect(() => {
    const clearDataStore = async () => {
      await DataStore.clear();
    };
    clearDataStore();
  }, []);
  
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { user, authStatus } = useAuthenticator(); // `authStatus` indica si está autenticado

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        if (authStatus === "authenticated" && user) {
          // Obtener el correo o ID alternativo
          const email = user.signInDetails?.loginId || user.username;
          console.log("Usuario autenticado con email o ID:", email);

          if (!email) {
            console.error("No se encontró un email válido para el usuario.");
            return;
          }

          setUserEmail(email); // Guardar el email para usarlo en el registro

          // Verificar si el usuario está registrado en DataStore
          const users = await DataStore.query(Usuario, (u) => u.email.eq(email));
          console.log(users);
          
          setIsRegistered(users.length > 0);
        }
      } catch (err) {
        console.error("Error verificando registro:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUserRegistration();
  }, [authStatus, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando sesión...</Text>
      </View>
    );
  }

  // Mostrar navegación si el usuario está registrado, o pantalla de registro con el email
  return isRegistered ? (
    <NavigationTabs />
  ) : (
    <RegisterScreen email={userEmail} />
  );  
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <AppContent />
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default App;
