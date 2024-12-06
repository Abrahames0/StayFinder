import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Step1Props = {
  onChange: (value: string) => void;
};

const Step1: React.FC<Step1Props> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelectedOption(value); // Actualizar el estado de la opción seleccionada
    onChange(value); // Notificar al componente principal
  };

  return (
    <View className="flex-1 px-4 mb-4">
      <Text className="text-2xl font-semibold mb-4">¿Qué tipo de estancia es?</Text>

      <TouchableOpacity className={`py-8 px-4 rounded-xl mb-8 ${ selectedOption === 'Compartido' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-300' }`} onPress={() => handleSelection('Compartido')}>
        <Text
          className={`font-semibold mb-1 text-lg ${ selectedOption === 'Compartido' ? 'text-purple-700' : 'text-black' }`}>
          Una habitación
        </Text>
        <Text className={`text-justify ${ selectedOption === 'Compartido' ? 'text-purple-500' : 'text-black' }`}>
          El huésped tendrá acceso a una habitación y algunas áreas comunes compartidas como baños, cocina, etc.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className={`py-9 px-4 rounded-xl mb-8 ${ selectedOption === 'Individual' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-300' }`} onPress={() => handleSelection('Individual')}>
        <Text
          className={`font-semibold mb-1 text-lg ${ selectedOption === 'Individual' ? 'text-purple-700' : 'text-black'}`}>
          Área completa
        </Text>
        <Text className={`text-justify ${ selectedOption === 'Individual' ? 'text-purple-500' : 'text-black' }`}>
          El huésped tiene acceso a toda la casa/habitación.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step1;
