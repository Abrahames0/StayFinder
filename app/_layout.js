import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 bg-slate-200">
      <Stack 
        screenOptions={{
          headerTitle: "",
        }}
      />
    </View>
  );
}
