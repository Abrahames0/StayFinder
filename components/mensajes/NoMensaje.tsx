import React,{ useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Biblioteca de íconos
import TabsMensajes from "./TabsMensajes";

const NoMensaje: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Todos");
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* Título */}
      <Text className="text-xl font-bold mb-4">Mensajes</Text>
      {/*TAbs*/}
      <TabsMensajes activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Botones de filtro */}
      <View className="flex-row space-x-4 mb-10">
        <TouchableOpacity className="bg-black px-6 py-2 rounded-full">
          <Text className="text-white text-base">Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 px-6 py-2 rounded-full">
          <Text className="text-black text-base">Asistencia</Text>
        </TouchableOpacity>
      </View>

      {/* Ícono y texto cuando no hay mensajes */}
      <View className="items-center">
        <View className="mb-4">
          {/* Icono */}
          <MaterialIcons name="chat-bubble-outline" size={48} color="#000" />
        </View>
        <Text className="text-base text-black mb-2">Todo está muy solo por aquí</Text>
        <Text className="text-gray-500">Cuando recibas un mensaje, aparecerá aquí.</Text>
      </View>
    </View>
  );
};

export default NoMensaje;
