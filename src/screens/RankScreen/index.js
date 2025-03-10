import DefaultLayout from "../../layouts/DefaultLayout";
import { View, Text } from "react-native";

function RankScreen({ navigation }) {
  return (
    <DefaultLayout>
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-center">Rank</Text>
      </View>
    </DefaultLayout>
  );
}

export default RankScreen;
