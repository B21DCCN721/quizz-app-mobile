import HeaderLayout from "../../layouts/HeaderLayout";
import { View, Text } from "react-native";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ImgRole from "../../../assets/imgs/imgrole.svg"

function RoleScreen({ navigation, route }) {
  const { mode } = route.params || {};
  return (
    <HeaderLayout>
      <View className="flex flex-1 justify-center items-center mt-20">
        {/* <Image
          className="w-[306px] h-[197px]"
          source={require("../../../assets/imgs/imgrole.png")}
        /> */}
        <ImgRole width= "306px" height= "197px"/>
        <Text className="font-interRegular text-2xl mt-5">
          Chọn vai trò của bạn
        </Text>
        <View className="flex flex-1 w-full items-center mt-5">
          <Button
            title="Học sinh"
            sxButton="bg-yellow w-[224px] rounded-[50px] mt-5"
            onClick={() =>
              mode === "login"
                ? navigation.navigate("Login")
                : navigation.navigate("SigupStudent")
            }
          />
          <Button
            title="Giáo viên"
            sxButton="bg-blue  w-[224px] rounded-[50px] mt-5"
            onClick={() =>
              mode === "login"
                ? navigation.navigate("Login")
                : navigation.navigate("SigupTeacher")
            }
          />
        </View>
      </View>
    </HeaderLayout>
  );
}

export default RoleScreen;
