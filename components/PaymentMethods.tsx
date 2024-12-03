import { Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const PaymentMethods = () => {
  const [isCardSelected, setIsCardSelected] = useState(false);  // Para el acordeón de tarjeta
  const [isPayPalSelected, setIsPayPalSelected] = useState(false);  // Para el acordeón de PayPal

  return (
    <View className="bg-white p-6 rounded-3xl shadow-xl mb-8">
      <Text className="text-xl font-semibold text-gray-800 mb-5">Método de pago</Text>

      {/* Acordeón de tarjeta de crédito o débito */}
      <TouchableOpacity
        onPress={() => setIsCardSelected(!isCardSelected)}
        className="border-b py-2 mb-2"
      >
        <View className="flex-row items-center">
            <FontAwesome name="cc-visa" size={24} color="black" className="mr-4" />
            <FontAwesome name="cc-mastercard" size={24} color="black" className="mr-4" />
            <Text className="text-lg text-gray-800 ml-2">Tarjeta de crédito o débito</Text>
        </View>

      </TouchableOpacity>
      {isCardSelected && (
        <View className="mb-4">
          <TextInput
            placeholder="Número de tarjeta"
            className="border p-2 rounded-md mb-2"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Fecha de expiración"
            className="border p-2 rounded-md mb-2"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Código de seguridad (CVV)"
            className="border p-2 rounded-md mb-2"
            secureTextEntry
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Acordeón de PayPal */}
      <TouchableOpacity
        onPress={() => setIsPayPalSelected(!isPayPalSelected)}
        className="border-b py-2 mb-2"
      >
        <View className="flex-row items-center">
          <Entypo name="paypal" size={24} color="black" />
          <Text className="text-lg text-gray-800 ml-2">PayPal</Text>
        </View>
      </TouchableOpacity>
      {isPayPalSelected && (
        <View className="mb-4">
          <TouchableOpacity
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
            onPress={() => alert('Redirigiendo a PayPal')}
          >
            <Text className="text-center">Pagar con PayPal</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaymentMethods;