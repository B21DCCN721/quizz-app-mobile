import { Image, View } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import Button from "../../components/Button";

function WelcomeScreen({ navigation }) {
  return (
    <DefaultLayot>
      <View className="flex flex-1 justify-center items-center mt-20">
        <Image
          className="w-[293px] h-[236px]"
          source={require("../../../assets/imgs/imgwelcome.png")}
        />
        <View className="flex flex-1 w-full items-center mt-5">
          <Button
            title="Đăng nhập"
            sxButton="bg-yellow border-0 w-[224px] rounded-[50px] mt-10"
            onClick={() => navigation.navigate("Role", { mode: "login" })}
          />
          <Button
            title="Đăng ký"
            sxButton="border-0 bg-blue  w-[224px] rounded-[50px] mt-5"
            onClick={() => navigation.navigate("Role", { mode: "sigup" })}
          />
        </View>
      </View>
    </DefaultLayot>
  );
}

export default WelcomeScreen;
