import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import NameApp from "../../../assets/imgs/nameapp.svg";
import { useSelector } from "react-redux";

function StartScreen({ navigation, route }) {
  const role = useSelector((state) => state.auth.role);
  const handleStart = () => {
    role ==="student"? navigation.replace("Main") : navigation.replace("MainTeacher")
  };
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <ImageBackground
        className="flex flex-1 bg-cover bg-[#FDF7E5]"
        source={require("../../../assets/imgs/start.png")}
      >
        <View className="flex flex-1 px-5 justify-between">
          <View className="flex flex-1 justify-center items-center">
            <Text className="font-semibold text-2xl mb-4">Chào mừng đến với</Text>
            <NameApp/>
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
