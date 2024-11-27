import React from "react";
import { FlatList, Text, View } from "react-native";
import { styled } from "nativewind";
import PropertyCard from "./PropertyCard";

interface RecommendationsListProps {
  title: string;
  recommendations: {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string | null;
  }[];
}

const StyledText = styled(Text);
const StyledView = styled(View);

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  title,
  recommendations,
}) => {
  return (
    <StyledView>
      <StyledText className="text-lg font-bold text-gray-800 px-4 mt-4">
        {title}
      </StyledText>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
           <PropertyCard
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image || "https://via.placeholder.com/300x300"}
            isHorizontal
          />
          
        )}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </StyledView>
  );
};

export default RecommendationsList;
