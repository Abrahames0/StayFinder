import React from "react";
import { View, Text } from "react-native";

interface LoadingIndicatorProps {
  message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">{message}</Text>
    </View>
  );
};

export default LoadingIndicator;
