import {  Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Header() {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute top-0 left-0 w-full h-16 flex flex-row items-center pl-5"
      onPress={() => navigation.goBack()}
    > 
      <Image className="w-[16px] h-[16px] mr-3" source={require("../../../assets/icons/back.png")} />
      <Text className="font-interRegular">Quay lại</Text>
    </TouchableOpacity>
  );
}

export default Header;
