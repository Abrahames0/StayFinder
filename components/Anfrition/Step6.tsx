import React from "react";
import { View, Text, TextInput } from "react-native";

type Step6Props = {
  titulo: string;
  descripcion: string;
  onChange: (key: string, value: string) => void;
};

const Step6: React.FC<Step6Props> = ({ titulo, descripcion, onChange }) => {
  const maxCharactersTitle = 32;
  const maxCharactersDescription = 500;

  const handleTitleChange = (text: string) => {
    if (text.length <= maxCharactersTitle) {
      onChange("titulo", text);
    }
  };

  const handleDescriptionChange = (text: string) => {
    if (text.length <= maxCharactersDescription) {
      onChange("descripcion", text);
    }
  };

  return (
    <View className="flex-1 px-4 mb-4">
      <Text className="text-2xl font-semibold mb-4">
        Agrega un título y una descripción a tu alojamiento.
      </Text>

      {/* Título */}
      <Text className="text-base text-gray-400 mb-2">
        El título ayudará a destacar tu alojamiento. Pero más adelante podrás editarlo si asi gustas.
      </Text>
      <TextInput
        className="border border-gray-400 rounded-xl p-4 mb-2 h-20 text-lg"
        value={titulo}
        onChangeText={handleTitleChange}
        maxLength={maxCharactersTitle}
        multiline={true}
        placeholder="Escribe un título..."
      />
      <Text className="text-sm mb-6 text-gray-500">
        {titulo.length}/{maxCharactersTitle}
      </Text>

      {/* Descripción */}
      <Text className="text-base text-gray-400 mb-2">
        Agrega una descripción para dar más detalles sobre tu alojamiento. Pero más adelante podrás editarlo si asi gustas.
      </Text>
      <TextInput
        className="border border-gray-400 rounded-xl p-4 mb-2 h-24 text-lg"
        value={descripcion}
        onChangeText={handleDescriptionChange}
        maxLength={maxCharactersDescription}
        multiline={true}
        placeholder="Escribe una descripción..."
      />
      <Text className="text-sm text-gray-500">
        {descripcion.length}/{maxCharactersDescription}
      </Text>
    </View>
  );
};

export default Step6;
