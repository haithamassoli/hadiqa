import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const GardenScreen = () => {
  const { gardenId }: { gardenId: string } = useLocalSearchParams();
  return (
    <View>
      <Text>GardenScreen</Text>
    </View>
  );
};

export default GardenScreen;
