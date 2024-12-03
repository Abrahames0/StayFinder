import PaymentMethods from '@/components/PaymentMethods';
import { styled } from 'nativewind';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const AgendarCitaScreen = ({ route, navigation }: any) => {
  const { property } = route.params;
  const StyledImage = styled(Image);

  const image =
      property.fotosAlojamiento && property.fotosAlojamiento.length > 0
        ? property.fotosAlojamiento[0]
        : "https://via.placeholder.com/60x60";

  const tarifaServicio = property.precioMensual * 0.06 ;
  const tarifaImpuestos = property.precioMensual * 0.06 ;
  const tarifaTotal = property.precioMensual + tarifaServicio + tarifaImpuestos;


  return (
    <View className="flex-1 bg-gray-100 py-8 px-6">
      {/* Botón de cancelar */}
      <View className="flex-row justify-between items-center mb-6">
        {/* Botón de cancelar */}
        <TouchableOpacity
          className="bg-gray-200 px-4 py-2 rounded-full w-24"
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text className="text-center text-gray-800">Cancelar</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-black text-right flex-1">
          Confirmar y Agendar
        </Text>
      </View>

      
      <View className="bg-white p-6 rounded-3xl shadow-xl mb-8">
        <View className="flex-row items-center">
          <StyledImage source={{ uri: image || "https://via.placeholder.com/60x60" }}className="w-16 h-16 rounded-xl mr-4"/>
          <Text className="text-xl font-semibold text-gray-800">
            {property.titulo}
          </Text>
        </View>
      </View>

      <PaymentMethods/>

      <View className="bg-white p-6 rounded-3xl shadow-xl mb-8">
        <Text className="text-xl font-semibold text-gray-800 mb-3">Detalles:</Text>
        {/* Detalles de los precios */}
        <View className="flex-row justify-between">
          <Text className="text-lg text-gray-600">Depósito inicial:</Text>
          <Text className="text-lg text-gray-800">${property.precioMensual}.00 mxn</Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-lg text-gray-600">Tarifa de servicio:</Text>
          <Text className="text-lg text-gray-800">${tarifaServicio}.00 mxn</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-lg text-gray-600">Impuestos:</Text>
          <Text className="text-lg text-gray-800">${tarifaImpuestos}.00 mxn</Text>
        </View>

        {/* Separador */}
        <View className="border-t border-gray-300 my-4" />

        {/* Total */}
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-semibold text-gray-800">Total:</Text>
          <Text className="text-xl font-semibold text-gray-800">${tarifaTotal}.00 mxn</Text>
        </View>
      </View>


      {/* Botón para confirmar cita */}
      <TouchableOpacity
        className="bg-[#DF96F9] py-3 rounded-full items-center shadow-md"
        onPress={() => {
          // Lógica para agendar cita
        }}
      >
        <Text className="text-white font-semibold text-lg">Confirmar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgendarCitaScreen;
