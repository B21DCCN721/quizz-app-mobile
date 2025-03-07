import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DefaultLayot({ children }) {
  return (
    <SafeAreaView className="flex flex-1 bg-white">{children}</SafeAreaView>
  );
}

export default DefaultLayot;
