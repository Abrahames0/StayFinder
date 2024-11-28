import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AccordionProps {
  title: string;
  content: string;
  extraInfo?: { icon: keyof typeof MaterialIcons.glyphMap, label: string }[]; // Usamos el tipo correcto de icono
}

const Accordion: React.FC<AccordionProps> = ({ title, content, extraInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lineMarginTop, setLineMarginTop] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(lineMarginTop, {
      toValue: isExpanded ? 0 : 10,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className="border-t border-gray-400 mb-0">
      <TouchableOpacity onPress={toggleAccordion} className="flex-row justify-between items-center p-4">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <View>
          {isExpanded ? (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          ) : (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f7fafc' }}>
          <Text className="text-base text-gray-900">{content}</Text>

          {/* Información adicional con iconos */}
          {extraInfo && (
            <View className="flex-row flex-wrap mt-4">
              {extraInfo.map((info, index) => (
                <View key={index} className="flex-row items-center mr-6 mb-2">
                  <MaterialIcons name={info.icon} size={30} color="black" />
                  <Text className="ml-2 text-sm text-gray-600">{info.label}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default Accordion;
