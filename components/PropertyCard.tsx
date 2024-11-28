import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { styled } from "nativewind";

interface PropertyCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  isHorizontal?: boolean;
}

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  description,
  price,
  image,
  isHorizontal = false,
}) => {
  return (
    <StyledTouchableOpacity
      className={`bg-white rounded-lg shadow-md p-4 ${
        isHorizontal ? "w-40 mx-2" : "mb-4 mx-4"
      }`}
    >
      <StyledImage
        source={{ uri: image }} // Se utiliza la URL dinámica
        className={`rounded-lg ${isHorizontal ? "w-40 h-32" : "w-full h-40 mb-2"}`}
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
