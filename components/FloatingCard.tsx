import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface FloatingCardProps {
  alojamiento: any;
  onClose: () => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ alojamiento, onClose }) => {
  return (
    <View className="absolute bottom-0 w-full px-4 mb-1 bg-white rounded-t-2xl shadow-lg p-7">
      <Image
        source={{
          uri: alojamiento.fotosAlojamiento?.[0] || "https://via.placeholder.com/150",
        }}
        className="w-full h-44 rounded-lg mb-4"
      />
      <Text className="text-lg font-bold">{alojamiento.titulo}</Text>
      <Text className="text-gray-500 mt-2">{alojamiento.descripcion}</Text>
      <View className="flex-row items-center mt-2">
        <Text className="text-purple-500 font-bold">${alojamiento.precioMensual} MXN</Text>
      </View>
      <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
        <Text className="text-lg font-bold text-gray-500">X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCard;
