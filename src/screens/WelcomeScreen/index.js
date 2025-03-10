import { View } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import Button from "../../components/Button";
import ImgWelcome from "../../../assets/imgs/imgwelcome.svg"

function WelcomeScreen({ navigation }) {
  return (
    <DefaultLayout>
      <View className="flex flex-1 justify-center items-center mt-20">
        {/* <Image
          className="w-[293px] h-[236px]"
          source={require("../../../assets/imgs/imgwelcome.png")}
        /> */}
        <ImgWelcome style = {{width: "293px", height: "236px"}}/>
        <View className="flex flex-1 w-full items-center mt-5">
          <Button
            title="Đăng nhập"
            sxButton="bg-yellow w-[224px] rounded-[50px] mt-10"
            onClick={() => navigation.navigate("Role", { mode: "login" })}
          />
          <Button
            title="Đăng ký"
            sxButton="bg-blue  w-[224px] rounded-[50px] mt-5"
            onClick={() => navigation.navigate("Role", { mode: "sigup" })}
          />
        </View>
      </View>
    </DefaultLayout>
  );
}

export default WelcomeScreen;
