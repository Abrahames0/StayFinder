import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Step3Props = {
  onChange: (key: string, value: string[]) => void;
};

const Step3: React.FC<Step3Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { key: 'Yo', label: 'Yo', icon: 'person-outline' },
    { key: 'Familia', label: 'Mi Familia', icon: 'people-outline' },
    { key: 'Huéspedes', label: 'Otros Huéspedes', icon: 'home-outline' },
    { key: 'Compañeros', label: 'Compañeros de Casa', icon: 'school-outline' },
  ];

  const handleToggle = (key: string) => {
    let updatedSelected;
    if (selected.includes(key)) {
      updatedSelected = selected.filter((item) => item !== key);
    } else {
      updatedSelected = [...selected, key];
    }
    setSelected(updatedSelected);
    onChange('personas', updatedSelected);
  };

  return (
    <View className="flex-1 px-4 mb-4">
      <Text className="text-2xl font-semibold mb-2">¿Quién más está en el alojamiento?</Text>
      <Text className="text-base text-gray-400 text-justify mb-8">
        Los huéspedes deben saber si hay otras personas en la estancia.
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            className={`w-[48%] h-24 border-2 rounded-xl flex items-center justify-center mb-4 ${
              selected.includes(option.key)
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300'
            }`}
            onPress={() => handleToggle(option.key)}
          >
            <Ionicons name={option.icon} size={32} color={selected.includes(option.key) ? '#6B46C1' : '#A0AEC0'}/>
            <Text className={`mt-2 text-base font-semibold ${ selected.includes(option.key) ? 'text-purple-600' : 'text-gray-600' }`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Step3;
