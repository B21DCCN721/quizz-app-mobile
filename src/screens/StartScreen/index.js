import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";

function StartScreen({ navigation }) {
  const handleStart = () => {
    navigation.replace("Main");
  };
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <ImageBackground
        className="flex flex-1 bg-cover bg-[#FDF7E5]"
        source={require("../../../assets/imgs/start.png")}
      >
        <View className="flex flex-1 px-5 justify-between">
          <View className="flex flex-1 justify-center items-center">
            <Text className="font-semibold text-2xl">Chào mừng đến với</Text>
            <Text className="text-7xl mt-5">abc</Text>
          </View>
          <Button
            title="Bắt đầu"
            sxButton="mb-5 bg-red border border-b-[4px] border-b-[#343B6E]"
            sxText="text-white text-base/[20px]"
            onClick={handleStart}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default StartScreen;
