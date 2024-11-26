import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void; // Evento para el botón de filtros
}

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
}) => {
  return (
    <StyledView className="flex-row items-center bg-white border-2 border-[#DF96F9] rounded-full mx-4 my-2 px-4 py-2 shadow-md">
      {/* Icono de búsqueda */}
      <Ionicons name="search" size={20} color="#7a7a7a" className="mr-2" />
      
      {/* Campo de entrada */}
      <StyledTextInput
        className="flex-1 text-gray-800"
        placeholder={placeholder || "Buscar..."}
        placeholderTextColor="#7a7a7a"
        value={value}
        onChangeText={onChangeText}
      />
      
      {/* Botón de filtros */}
      <StyledTouchableOpacity
        className="bg-[#DF96F9] w-8 h-8 rounded-full justify-center items-center ml-2"
        onPress={onFilterPress}
      >
        <Ionicons name="filter" size={20} color="white" />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default SearchBar;
