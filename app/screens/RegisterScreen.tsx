import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from "react-native";
import { getCurrentUser } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario, TipoUsuario } from "../../src/models";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Register: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser(); // Obtener el usuario autenticado
        console.log("Datos del usuario:", user);

        const { username } = user; // Obtener el correo del usuario

        if (!username) {
          throw new Error("El usuario no tiene un correo asociado.");
        }

        console.log(`Usuario autenticado con email: ${username}`);
        setEmail(username); // Guardar el email en el estado

        // Consultar si el usuario está registrado en DataStore
        const users = await DataStore.query(Usuario, (u) => u.email.eq(username));
        setIsRegistered(users.length > 0); // Verificar si el usuario existe
      } catch (err) {
        console.error("Error verificando el usuario:", err);
        setIsRegistered(false); // Marcar como no registrado en caso de error
      }
    };

    checkUser();
  }, []);

  const pickImage = (): void => {
    console.log("Elige una imagen");
  };

  const handleSave = async (): Promise<void> => {
    try {
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
      setIsRegistered(true);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  if (isRegistered === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verificando usuario...</Text>
      </View>
    );
  }

  if (isRegistered) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido, ya estás registrado.</Text>
        <Button title="Cerrar sesión" onPress={() => console.log("Cerrar sesión")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <View style={styles.imagePickerContainer}>
        <Text style={styles.placeholderText}>Agrega tu foto de perfil</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialIcons name="add-a-photo" size={24} color="black" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.labelContainer}>
        <TextInput
          placeholder="Nombres"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.labelContainer}>
        <TextInput
          placeholder="Apellidos"
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />
      </View>

      <View style={styles.labelContainer}>
        <TextInput
          placeholder="Edad"
          keyboardType="numeric"
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
        />
      </View>

      <View style={styles.labelContainer}>
        <TextInput
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>
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
  labelContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    color: "#374151",
    backgroundColor: "#F9FAFB",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#C084FC",
    padding: 12,
    borderRadius: 20,
    width: "48%",
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
  },
});

export default Register;
