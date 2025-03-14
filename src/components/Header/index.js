import {  Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconBack from "../../../assets/icons/back.svg";

function Header() {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute top-0 left-0 w-full h-16 flex flex-row items-center pl-5"
      onPress={() => navigation.goBack()}
    > 
      <IconBack width= "16px" height= "16px"/>
      <Text className="font-interRegular ml-3">Quay lại</Text>
    </TouchableOpacity>
  );
}

export default Header;
