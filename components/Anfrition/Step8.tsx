import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type Step8Props = {
  bathrooms: number;
  beds: number;
  time: number;
  rules: string;
  onChange: (key: string, value: string | number) => void;
};

const Step8: React.FC<Step8Props> = ({ bathrooms, beds, rules, time, onChange }) => {
  const handleIncrement = (key: string, value: number, step: number = 1) => {
    onChange(key, parseFloat((value + step).toFixed(1)));
  };

  const handleDecrement = (key: string, value: number, step: number = 1) => {
    if (key === "bathrooms" && value > 0.5) {
      onChange(key, parseFloat((value - step).toFixed(1)));
    }
    if (key === "beds" && value > 1) {
      onChange(key, parseFloat((value - step).toFixed(1)));
    }
    if (key === "time" && value > 6) {
        onChange(key, parseFloat((value - step).toFixed(1)));
      }
  };

  return (
    <View className="flex-1 px-4 mb-4">
      <Text className="text-2xl font-semibold mb-2">Detalles del Alojamiento</Text>
      <Text className="text-base text-gray-400 mb-8">Agrega reglas, Puedes cambiarlo cuando quieras.</Text>

      {/* Contador de Baños */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-lg text-black font-semibold">¿Cuántos baños hay?</Text>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              bathrooms > 0.5 ? "bg-gray-300" : "bg-gray-200"
            }`}
            disabled={bathrooms <= 0.5} 
            onPress={() => handleDecrement("bathrooms", bathrooms, 0.5)}
          >
            <FontAwesome6 name="minus" size={15} color={bathrooms > 0.5 ? "#000" : "#aaa"} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">{bathrooms}</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
            onPress={() => handleIncrement("bathrooms", bathrooms, 0.5)}
          >
            <FontAwesome6 name="plus" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-t border-gray-400 mt-2 pt-2"/>
      {/* Contador de Camas */}
      <View className="flex-row items-center justify-between mb-20">
        <Text className="text-lg text-black font-semibold">¿Cuántas camas hay?</Text>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              beds > 1 ? "bg-gray-300" : "bg-gray-200"
            }`}
            disabled={beds <= 1} 
            onPress={() => handleDecrement("beds", beds)}
          >
            <FontAwesome6 name="minus" size={15} color={beds > 1 ? "#000" : "#aaa"} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">{beds}</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
            onPress={() => handleIncrement("beds", beds)}
          >
            <FontAwesome6 name="plus" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-2xl font-semibold mb-2">Tiempo del alojamineto</Text>
      <Text className="text-base text-gray-400 mb-2">Agrega un tiempo de renta del alojamineto, Puedes cambiarlo despues.</Text>
      <View className="flex-row items-center justify-between mb-20">
        <Text className="text-lg text-black font-semibold">¿Cuanto tiempo quieres rentar el alojamineto?</Text>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity className={`w-10 h-10 rounded-full flex items-center justify-center ${ time > 6 ? "bg-gray-300" : "bg-gray-200"}`}
            disabled={time <= 1} 
            onPress={() => handleDecrement("time", time)}
          >
            <FontAwesome6 name="minus" size={15} color={time > 1 ? "#000" : "#aaa"} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">{time}</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
            onPress={() => handleIncrement("time", time)}
          >
            <FontAwesome6 name="plus" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reglas del Alojamiento */}
      <View className="mb-4">
        <Text className="text-2xl text-black font-semibold mb-2">Reglas del alojamiento</Text>
        <Text className="text-base text-gray-400 mb-3">Agrega reglas, Puedes cambiarlo cuando quieras.</Text>

        <TextInput
          className="border border-gray-300 rounded-2xl p-4 text-lg"
          value={rules}
          onChangeText={(text) => onChange("rules", text)}
          multiline={true}
          placeholder="Escribe las reglas aquí..."
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

export default Step8;