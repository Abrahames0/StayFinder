import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const ProfileScreen = () => {
  const { signOut } = useAuthenticator(); // Obtener la función de cierre de sesión

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProfileScreen;
