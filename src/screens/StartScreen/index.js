import { ImageBackground, Text, View } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import Button from "../../components/Button";

function StartScreen({ navigation }) {
  const handleStart = () => {
    navigation.replace("Main");
  };
  return (
    <DefaultLayot>
      <ImageBackground
        className="flex flex-1 bg-cover bg-[#FDF7E5]"
        source={require("../../../assets/imgs/start.png")}
      >
        <View className="px-5 flex flex-1 justify-between">
          <View className="flex flex-1 justify-center items-center">
            <Text className="font-semibold text-2xl">Chào mừng đến với</Text>
            <Text className="text-7xl mt-5">abc</Text>
          </View>
          <Button
            title="Bắt đầu"
            sxButton="mb-5 bg-red"
            sxText="text-white text-base/[20px]"
            onClick={handleStart}
          />
        </View>
      </ImageBackground>
    </DefaultLayot>
  );
}

export default StartScreen;
