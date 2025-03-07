import { View, Text } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";

function LessonScreen({ navigation }) {
  return (
    <DefaultLayot>
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-center">Bai thi</Text>
      </View>
    </DefaultLayot>
  );
}

export default LessonScreen;
