import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface TabsMensajesProps {
  activeTab: string; // Pestaña activa
  setActiveTab: (tab: string) => void; // Función para cambiar la pestaña activa
}

const TabsMensajes: React.FC<TabsMensajesProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex-row justify-start bg-white py-2 px-4">
      {["Todos", "Asistencia"].map((tab) => (
        <TouchableOpacity
          key={tab}
          className={`px-4 py-2 rounded-full ${
            activeTab === tab ? "bg-black" : "bg-gray-200"
          }`}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            className={`text-center font-bold ${
              activeTab === tab ? "text-white" : "text-black"
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabsMensajes;
