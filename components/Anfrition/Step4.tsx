import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Step4Props = {
  onChange: (key: string, value: string[]) => void;
};

const Step4: React.FC<Step4Props> = ({ onChange }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { key: 'Wifi', label: 'Wifi', icon: 'wifi-outline' },
    { key: 'Tv', label: 'Televisión', icon: 'tv-outline' },
    { key: 'Lavadora', label: 'Lavadora', icon: 'shirt-outline' },
    { key: 'Estacionamiento', label: 'Estacionamiento', icon: 'car-outline' },
  ];

  const servicesSpecial = [
    { key: 'Jardin', label: 'Jardín', icon: 'leaf-outline' },
    { key: 'AreaDeJuegos', label: 'Área de juegos', icon: 'game-controller-outline' },
    { key: 'Jacuzzi', label: 'Jacuzzi', icon: 'water-outline' },
  ];

  const servicesSecurity = [
    { key: 'DetectorDeHumo', label: 'Detector de humo', icon: 'cloud-outline' },
    { key: 'Botiquin', label: 'Botiquín', icon: 'medkit-outline' },
    { key: 'Extintor', label: 'Extintor de incendios', icon: 'flame-outline' },
  ];

  const handleToggle = (key: string) => {
    let updatedSelection;
    if (selectedServices.includes(key)) {
      updatedSelection = selectedServices.filter((item) => item !== key);
    } else {
      updatedSelection = [...selectedServices, key];
    }
    setSelectedServices(updatedSelection);
    onChange('servicios', updatedSelection);
  };

  const renderServiceGroup = (group: { key: string; label: string; icon: string }[]) => {
    return group.map((service) => (
      <TouchableOpacity
        key={service.key}
        className={`w-[48%] h-24 border-2 rounded-xl flex items-center justify-center mb-4 ${
          selectedServices.includes(service.key)
            ? 'border-purple-500 bg-purple-100'
            : 'border-gray-300'
        }`}
        onPress={() => handleToggle(service.key)}
      >
        <Ionicons
          name={service.icon}
          size={32}
          color={selectedServices.includes(service.key) ? '#6B46C1' : '#A0AEC0'}
        />
        <Text
          className={`mt-2 text-base font-semibold ${
            selectedServices.includes(service.key) ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          {service.label}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView className="flex-1 px-4 py-2">
      <View className="mb-4">
        <Text className="text-2xl font-semibold mb-4">¿Qué ofreces en tu espacio?</Text>
          <Text className="text-base text-gray-400 text-justify mb-1">
             Estos son los servicios preferidos de los huéspedes.
          </Text>
        <View className="flex-row flex-wrap justify-between">
          {renderServiceGroup(services)}
        </View>

        <Text className="text-xl font-semibold mb-4">Servicios Especiales</Text>
        <Text className="text-base text-gray-400 text-justify mb-1">
          Ofrece servicios adicionales para destacar tu alojamiento.
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {renderServiceGroup(servicesSpecial)}
        </View>

        <Text className="text-xl font-semibold mb-4">Medidas de Seguridad</Text>
        <Text className="text-base text-gray-400 text-justify mb-1">
          Agrega elementos que brinden seguridad a tus huéspedes.
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {renderServiceGroup(servicesSecurity)}
        </View>
      </View>
    </ScrollView>
  );
};

export default Step4;