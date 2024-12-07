import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styled } from "nativewind";

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (selectedCategories: string[]) => void;
  onClearFilters: () => void;
}

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { key: "recreacion", label: "Recreación", icon: "history-edu" },
    { key: "residenciales", label: "Residenciales", icon: "people-outline" },
    { key: "transporte", label: "Transporte", icon: "directions-bus" },
    { key: "servicios", label: "Servicios", icon: "shopping-basket" },
    { key: "cafeterias", label: "Cafeterías", icon: "local-cafe" },
    { key: "papelerias", label: "Papelerías", icon: "local-library" },
    { key: "lavanderias", label: "Lavanderías", icon: "local-laundry-service" },
  ];

  const handleToggle = (key: string) => {
    if (selected.includes(key)) {
      setSelected((prev) => prev.filter((item) => item !== key));
    } else {
      setSelected((prev) => [...prev, key]);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-opacity-80">
        <StyledView className="bg-slate-50 rounded-t-2xl h-[70%]">
          {/* Header */}
          <StyledView className="flex-row items-center justify-center border-b border-gray-300 px-4 py-2">
            <TouchableOpacity onPress={onClose} className="absolute left-4">
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <StyledText className="text-lg font-bold text-center">Filtros</StyledText>
          </StyledView>

          {/* Contenido */}
          <StyledView className="flex-1 p-6">
            <View className="flex-row flex-wrap justify-between">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  className={`w-[48%] h-20 border rounded-lg flex items-center justify-center mb-4 ${
                    selected.includes(option.key)
                      ? "border-purple-500 bg-purple-100"
                      : "border-gray-300"
                  }`}
                  onPress={() => handleToggle(option.key)}
                >
                  <MaterialIcons
                    name={option.icon}
                    size={28}
                    color={
                      selected.includes(option.key) ? "#6B46C1" : "#A0AEC0"
                    }
                  />
                  <Text
                    className={`mt-2 text-sm font-semibold ${
                      selected.includes(option.key)
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </StyledView>

          {/* Footer fijo */}
          <StyledView className="border-t border-gray-200 px-6 py-4">
            <StyledTouchableOpacity
              className="bg-[#DF96F9] rounded-full py-3 mb-3"
              onPress={() => {
                onApplyFilters(selected);
                setSelected([]);
                onClose();
              }}
            >
              <StyledText className="text-white text-center font-bold text-base">
                Mostrar zonas de interés
              </StyledText>
            </StyledTouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClearFilters();
                setSelected([]);
              }}
            >
              <StyledText className="text-gray-500 text-center font-bold text-base">
                Quitar filtros
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default FiltersModal;