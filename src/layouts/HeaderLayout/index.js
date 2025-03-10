import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

function HeaderLayout({ children }) {
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View className="flex flex-1 bg-white px-5">
        <Header />
        <View className="flex flex-1 bg-white mt-16">{children}</View>
      </View>
    </SafeAreaView>
  );
}

export default HeaderLayout;
