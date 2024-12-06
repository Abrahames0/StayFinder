import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Step7Props = {
  precio: string;
  onChange: (value: string) => void;
};

const Step7: React.FC<Step7Props> = ({ precio, onChange }) => {
  const [showDetails, setShowDetails] = useState(false); // Controlar visibilidad de los detalles

  const handlePriceChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      onChange(text);
    }
  };

  // Calcular precios
  const basePrice = parseFloat(precio || "0");
  const serviceFee = basePrice * 0.08; // tarifa de servicio del 15%
  const totalPrice = basePrice + serviceFee;
  const earnings = basePrice * 0.99; // El anfitrión recibe el 85%

  return (
    <View className="flex-1 px-4">
      {/* Título */}
      <Text className="text-2xl font-semibold mb-2">Ahora, establece un precio</Text>
      <Text className="text-base text-gray-400 mb-8">Puedes cambiarlo cuando quieras.</Text>

      {/* Contenedor del precio */}
      <View className="flex-1 justify-center items-center px-4">
        <View className="flex-row items-center mb-4">
        <Text className="text-5xl font-bold text-black mr-1">$</Text>
          <TextInput
            className="text-5xl font-bold text-center text-black"
            value={precio}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            placeholder="0"
            maxLength={6}
          />
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Siempre visible */}
        <Text className="text-sm text-gray-500 text-center">
          Precio para el huésped (sin impuestos): $
          {precio ? (parseFloat(precio) * 1.15).toFixed(2) : "0.00"} MXN
        </Text>

        <TouchableOpacity
          className="mt-4"
          onPress={() => setShowDetails((prev) => !prev)}
        >
          <Text className="text-sm text-purple-600">
            {showDetails ? "Mostrar menos ▲" : "Mostrar más ▼"}
          </Text>
        </TouchableOpacity>

        {showDetails && (
          <View className="mt-4 p-4 border border-gray-300 rounded-lg">
            <View className="flex-row justify-between mb-2">
              <Text className="text-base text-gray-600">Precio base</Text>
              <Text className="text-base text-gray-800">${basePrice.toFixed(2)} MXN</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-base text-gray-600">Tarifa de servicio para huéspedes</Text>
              <Text className="text-base text-gray-800">${serviceFee.toFixed(2)} MXN</Text>
            </View>
            <View className="border-t border-gray-300 mt-2 pt-2">
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-gray-600">Tú recibes</Text>
                <Text className="text-base font-semibold text-gray-800">
                  ${earnings.toFixed(2)} MXN
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Step7;