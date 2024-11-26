import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const { height } = Dimensions.get("window");

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
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
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-black bg-opacity-50">
        <StyledView className="bg-white rounded-t-2xl max-h-[70%]">
          {/* Header */}
          <StyledView className="flex-row items-center justify-center border-b border-gray-200 px-4 py-2">
            <TouchableOpacity onPress={onClose} className="absolute left-4">
                <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <StyledText className="text-lg font-bold text-center">Filtros</StyledText>
           </StyledView>

          {/* Contenid */}
          <StyledView className="flex-1 p-4">
            {/* Aquí puedes agregar opciones de filtros */}
          </StyledView>

          {/* Footer */}
          <StyledView className="border-t border-gray-200 px-4 py-4">
            <StyledTouchableOpacity className="bg-[#DF96F9] rounded-full py-3 mb-2" onPress={onApplyFilters}>
              <StyledText className="text-white text-center font-bold">
                Mostrar alojamientos
              </StyledText>
            </StyledTouchableOpacity>
            <TouchableOpacity onPress={onClearFilters}>
              <StyledText className="text-gray-500 text-center font-bold">
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
