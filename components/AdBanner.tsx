import React from "react";
import { View, Text, Image } from "react-native";
import { styled } from "nativewind";

interface AdBannerProps {
  image: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const AdBanner: React.FC<AdBannerProps> = ({ image }) => {
  return (
    <StyledView className="mx-4 my-2">
      <StyledImage source={{ uri: image }} className="w-full h-24 rounded-lg" />
      <StyledText className="text-xs text-gray-500 mt-1">Anuncio</StyledText>
    </StyledView>
  );
};

export default AdBanner;
