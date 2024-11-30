import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "../../src/models";
import { Picker } from "@react-native-picker/picker";

const EditProfileScreen: React.FC<any> = ({ route, navigation }) => {
  const { user } = route.params; // Recibir datos del usuario
  
  const [profileImage, setProfileImage] = useState<string | null>(user.fotoUsuario);
  const [nombre, setNombre] = useState<string>(user.nombre);
  const [apellido, setApellido] = useState<string>(user.apellido);
  const [edad, setEdad] = useState<string>(user.edad);
  const [telefono, setTelefono] = useState<string>(user.telefono);

  const handleSave = async () => {
    if (!user) return;

    console.log("Datos antes de guardar:", {
      nombre,
      apellido,
      telefono,
      edad,
      fotoUsuario: profileImage ?? "default",
    });

    try {
      // Utilizando copyOf para actualizar el registro en DataStore
      await DataStore.save(
        Usuario.copyOf(user, (updatedUser) => {
          updatedUser.nombre = nombre;
          updatedUser.apellido = apellido;
          updatedUser.telefono = telefono;
          updatedUser.edad = edad;
          updatedUser.fotoUsuario = profileImage ?? "default"; // Si no hay imagen, usamos "default"
        })
      );

      console.log("Perfil guardado exitosamente:", {
        nombre,
        apellido,
        telefono,
        edad,
        fotoUsuario: profileImage ?? "default",
      });

      navigation.navigate("Perfil"); // Volver a la pantalla anterior
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Editar Perfil</Text>

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
        onChangeText={(text) => setNombre(text)} // Capitaliza en tiempo real
      />

      <TextInput
        placeholder="Apellidos"
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 mb-4 w-full"
        value={apellido}
        onChangeText={(text) => setApellido(text)} // Capitaliza en tiempo real
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
        onChangeText={(text) => setTelefono(text.replace(/\D/g, ""))} // Solo permite números
        maxLength={10}
      />

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

export default EditProfileScreen;
