import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react-native";
import awsconfig from "../src/amplifyconfiguration.json";
import RegisterScreen from "./screens/RegisterScreen";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario, TipoUsuario } from "../src/models";
import { UserProvider } from "@/components/hooks/UserContext";
import { useUser } from "@/components/hooks/UserContext";
import Router from "./navigation/Router";

Amplify.configure(awsconfig);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userType, setUserType] = useState<TipoUsuario | null>(null); // Tipo de usuario
  const { setUser } = useUser(); // Obtenemos setUser del contexto
  const { user, authStatus } = useAuthenticator(); // `authStatus` indica si está autenticado

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        if (authStatus === "authenticated" && user) {
          const email = user.signInDetails?.loginId || user.username;
          setUserEmail(email);

          const users = await DataStore.query(Usuario, (u) => u.email.eq(email));

          if (users.length > 0) {
            const currentUser = users[0];
            setUser(currentUser); // Establecer usuario en el contexto

            // Validar y establecer el tipo de usuario
            if (currentUser.tipo === "ESTUDIANTE" || currentUser.tipo === "ANFITRION") {
              setUserType(currentUser.tipo);
            } else {
              console.error("Tipo de usuario desconocido.");
            }

            setIsRegistered(true);
          } else {
            setIsRegistered(false);
          }
        }
      } catch (err) {
        console.error("Error verificando registro:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUserRegistration();
  }, [authStatus, user]);

  const handleRegisterComplete = () => {
    setIsRegistered(true);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando sesión...</Text>
      </View>
    );
  }

  /
  if (isRegistered) {
    if (userType === "ESTUDIANTE") {
      return <Router initialRoute="Tabs" />; 
    } else if (userType === "ANFITRION") {
      return <Router initialRoute="TabsAnfitrion" />;s
    }
  }

  // Si no está registrado, mostrar pantalla de registro
  return <RegisterScreen email={userEmail} onRegisterComplete={handleRegisterComplete} />;
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <UserProvider>
          <AppContent />
        </UserProvider>
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
