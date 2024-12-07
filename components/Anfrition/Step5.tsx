import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type Step5Props = {
  images: string[]; // Recibe las imágenes desde el componente padre
  onAddImage: (images: string[]) => void; // Callback para actualizar las imágenes en el componente padre
};

const Step5: React.FC<Step5Props> = ({ images, onAddImage }) => {
  const handleAddImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso a la galería para agregar imágenes."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      // Actualiza el estado del componente padre con las nuevas imágenes
      onAddImage([...images, ...selectedImages]);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso a la cámara para tomar fotos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const photo = result.assets[0].uri;
      // Actualiza el estado del componente padre con la nueva foto
      onAddImage([...images, photo]);
    }
  };

  return (
    <ScrollView className="flex-1 px-4 py-2">
      <View className="mb-4">
        <Text className="text-2xl font-semibold mb-3">
          Agrega Imágenes del Alojamiento
        </Text>
        <Text className="text-base text-gray-400 text-justify mb-4">
          Se necesitan al menos 4 fotografías. Después podrás agregar más o hacer
          cambios.
        </Text>

        <TouchableOpacity
          className="flex-row items-center bg-[#DF96F9] border-2 border-purple-400 py-4 px-5 rounded-xl mb-4"
          onPress={handleAddImage}
        >
          <Ionicons name="images-outline" size={24} color="#FFFFFF" className="mr-3" />
          <Text className="text-white text-lg font-semibold"> Agregar Imágenes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-[#DF96F9] border-2 border-purple-400 py-4 px-5 rounded-xl"
          onPress={handleTakePhoto}
        >
          <Ionicons name="camera-outline" size={24} color="#FFFFFF" className="mr-3" />
          <Text className="text-white text-lg font-semibold"> Tomar Fotografías Nuevas</Text>
        </TouchableOpacity>

        {/* Validación del número de imágenes */}
        {images.length < 4 && (
          <Text className="text-red-500 mt-2">
            Debes subir al menos 4 imágenes. Actualmente has subido {images.length}.
          </Text>
        )}

        {images.length > 0 && (
          <View className="mt-6">
            <Text className="text-xl font-semibold mb-4">Vista Previa de Imágenes</Text>
            <View className="flex-row flex-wrap justify-between">
              {images.map((image, index) => (
                <View key={index} className="w-[48%] h-32 mb-4">
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Step5;
