import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { styled } from "nativewind";

interface PropertyCardProps {
  title: string;
  description: string;
  price: string;
  image: string | null;
  isHorizontal?: boolean;
  onPress: () => void;
}

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const PropertyCard: React.FC<PropertyCardProps> = ({ title, isHorizontal, description, price, image, onPress }) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-lg shadow-md p-4 ${isHorizontal ? "w-40 mx-2" : "mb-4 mx-4"}`}
    >
      <StyledImage
        source={{ uri: image || "https://via.placeholder.com/300x300" }} // Usa una imagen por defecto si image es null
        className={`rounded-lg ${isHorizontal ? "w-32 h-32" : "w-full h-40 mb-2"}`}
      />
      <StyledText className="text-sm font-bold text-gray-800">{title}</StyledText>
      <StyledText className="text-xs text-gray-500">{description}</StyledText>
      <StyledText className="text-sm font-semibold text-[#DF96F9] mt-2">
        {price}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default PropertyCard;
