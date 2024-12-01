import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DataStore } from "@aws-amplify/datastore";
import { uploadData } from "aws-amplify/storage";
import * as ImagePicker from "expo-image-picker";
import { Usuario, TipoUsuario } from "../../src/models";

interface RegisterProps {
  email: string | null; // Email recibido desde AppContent
  onRegisterComplete: () => void;
}

const RegisterScreen: React.FC<RegisterProps> = ({ email, onRegisterComplete }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null); // Para el preview
  const [uploading, setUploading] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  // Función para seleccionar imagen desde la galería
  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        setImageUri(uri); // Establecer URI para preview
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
    }
  };

  // Subir la imagen al S3
  const uploadImageToS3 = async (): Promise<string | null> => {
    try {
      if (!imageUri || !email) return null;

      setUploading(true);
      const filename = `profile-images/${Date.now()}-${email}.jpg`;

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadData({
        key: filename,
        data: blob,
      });

      const imageUrl = `https://stayfinder-storage-771fbe21d527c-dev.s3.us-east-1.amazonaws.com/public/${filename}`;
      return imageUrl;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const validateFields = (): boolean => {
    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !edad) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Alert.alert("Error", "El número de teléfono debe tener 10 dígitos.");
      return false;
    }

    return true;
  };

  const handleSave = async (): Promise<void> => {
    try {
      if (!email) {
        console.error("No se encontró un email válido para guardar.");
        return;
      }

      if (!validateFields()) return;

      // Subir la imagen al S3
      const uploadedImageUrl = await uploadImageToS3();

      // Guardar datos en DataStore
      await DataStore.save(
        new Usuario({
          nombre,
          apellido,
          email,
          telefono,
          edad,
          fotoUsuario: uploadedImageUrl ?? "default",
          tipo: TipoUsuario.ESTUDIANTE,
        })
      );

      Alert.alert("Éxito", "Usuario registrado correctamente.");
      setProfileImage(null);
      setImageUri(null); // Reiniciar preview
      setNombre("");
      setApellido("");
      setEdad("");
      setTelefono("");
      onRegisterComplete();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      Alert.alert("Error", "Hubo un problema al guardar el usuario.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Crea tu cuenta</Text>

      {/* Foto de perfil */}
      <View className="items-center mb-6">
        <TouchableOpacity
          onPress={handleSelectImage}
          className="bg-gray-100 rounded-full w-32 h-32 flex justify-center items-center border border-dashed border-gray-400"
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="w-32 h-32 rounded-full" />
          ) : (
            <MaterialIcons name="add-a-photo" size={36} color="gray" />
          )}
        </TouchableOpacity>
        <Text className="text-gray-500 mt-2">Agrega tu foto de perfil</Text>
      </View>

      {/* Campos de entrada */}
      <TextInput
        placeholder="Nombres"
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 mb-4 w-full"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />

      <TextInput
        placeholder="Apellidos"
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 mb-4 w-full"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
      />

      <View className="border border-gray-300 rounded-lg bg-gray-100 mb-3 w-full h-12">
        <Picker
          selectedValue={edad}
          onValueChange={(itemValue: string) => setEdad(itemValue)}
        >
          <Picker.Item label="Selecciona tu edad" value="" enabled={false} />
          {Array.from({ length: 83 }, (_, i) => (i + 18).toString()).map((age) => (
            <Picker.Item key={age} label={age} value={age} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 mb-4 w-full"
        value={telefono}
        onChangeText={(text) => setTelefono(text.replace(/\D/g, ""))}
        maxLength={10}
      />
            {/* Identificación */}
            <View className="w-full h-40 border border-gray-300 bg-gray-100 rounded-lg shadow-md flex justify-center items-center mb-6">
        <MaterialIcons name="credit-card" size={36} color="gray" />
        <Text className="text-gray-500 mt-2 text-center">
          Credencial estudiantil o identificación oficial
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-purple-400 rounded-full px-5 py-2 mt-3 flex items-center justify-center"
        disabled={uploading}
      >

        
        <Text className="text-white font-semibold">
          {uploading ? "Subiendo..." : "Guardar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
