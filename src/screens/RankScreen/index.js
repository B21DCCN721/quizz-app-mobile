import DefaultLayot from "../../layouts/DefaultLayot";
import { View, Text } from "react-native";

function RankScreen({ navigation }) {
  return (
    <DefaultLayot>
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-center">Rank</Text>
      </View>
    </DefaultLayot>
  );
}

export default RankScreen;
