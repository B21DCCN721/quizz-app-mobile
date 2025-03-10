import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DefaultLayout({ children }) {
  return (
    <SafeAreaView className="flex flex-1 bg-white"><View className="flex flex-1 bg-white px-5 mt-5">{children}</View></SafeAreaView>
  );
}

export default DefaultLayout;
