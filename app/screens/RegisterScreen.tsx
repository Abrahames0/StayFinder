import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario, TipoUsuario } from "../../src/models";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface RegisterProps {
  email: string | null; // Email recibido desde AppContent
}

const RegisterScreen: React.FC<RegisterProps> = ({ email }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const handleSave = async (): Promise<void> => {
    try {
      if (!email) {
        console.error("No se encontró un email válido para guardar.");
        return;
      }

      await DataStore.save(
        new Usuario({
          nombre,
          apellido,
          email,
          telefono,
          fotoUsuario: profileImage ?? "default",
          tipo: TipoUsuario.ESTUDIANTE,
        })
      );
      console.log("Usuario guardado con éxito");
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <View style={styles.imagePickerContainer}>
        <Text style={styles.placeholderText}>Agrega tu foto de perfil</Text>
        <TouchableOpacity onPress={() => console.log("Selecciona una imagen")} style={styles.imagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialIcons name="add-a-photo" size={24} color="black" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Nombres"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellidos"
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="Edad"
        keyboardType="numeric"
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
      />
      <TextInput
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    backgroundColor: "#E5E7EB",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#6B7280",
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    color: "#374151",
    backgroundColor: "#F9FAFB",
    marginBottom: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#C084FC",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
  },
});

export default RegisterScreen;
