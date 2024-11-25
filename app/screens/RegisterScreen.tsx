import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario, TipoUsuario } from "../../src/models";

interface RegisterProps {
  email: string | null; // Email recibido desde AppContent
}

const RegisterScreen: React.FC<RegisterProps> = ({ email }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<string>(""); // Inicia vacío para mostrar el placeholder
  const [telefono, setTelefono] = useState<string>("");

  const handleSave = async (): Promise<void> => {
    try {
      // Validaciones previas
      if (!email) {
        console.error("No se encontró un email válido para guardar.");
        return;
      }

      if (!nombre || !apellido || !telefono || !edad || edad === "") {
        console.error("Por favor, completa todos los campos antes de guardar.");
        return;
      }

      // Guardar los datos en DataStore
      await DataStore.save(
        new Usuario({
          nombre,
          apellido,
          email,
          telefono,
          edad, // Asegúrate de que el valor sea consistente con el modelo
          fotoUsuario: profileImage ?? "default",
          tipo: TipoUsuario.ESTUDIANTE,
        })
      );

      console.log("Usuario guardado con éxito");

      // Reinicia los campos del formulario
      setProfileImage(null);
      setNombre("");
      setApellido("");
      setEdad("");
      setTelefono("");
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Crea tu cuenta</Text>

      {/* Foto de perfil */}
      <View className="items-center mb-6">
        <TouchableOpacity
          onPress={() => console.log("Selecciona una imagen")}
          className="bg-gray-100 rounded-full w-32 h-32 flex justify-center items-center border border-dashed border-gray-400"
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} className="w-32 h-32 rounded-full" />
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
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellidos"
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 mb-4 w-full"
        value={apellido}
        onChangeText={setApellido}
      />

      {/* Selector de edad */}
      <View className="border border-gray-300 rounded-lg bg-gray-100 mb-3 w-full h-12">
        <Picker
          selectedValue={edad}
          onValueChange={(itemValue: string) => setEdad(itemValue)}
          className="w-full h-full text-gray-700"
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
        onChangeText={setTelefono}
      />

      {/* Identificación */}
      <View className="w-full h-40 border border-gray-300 bg-gray-100 rounded-lg shadow-md flex justify-center items-center mb-6">
        <MaterialIcons name="credit-card" size={36} color="gray" />
        <Text className="text-gray-500 mt-2 text-center">
          Credencial estudiantil o identificación oficial
        </Text>
      </View>

      {/* Botón Guardar */}
      <View className="w-full flex flex-row justify-start">
        <TouchableOpacity
          onPress={handleSave}
          className="bg-purple-400 rounded-full px-5 py-2 mt-3 flex items-center justify-center"
        >
          <Text className="text-white font-semibold">Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
