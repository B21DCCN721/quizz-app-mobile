import React from "react";
import { View, Text } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";

export default function HomeScreen() {
  return (
    <DefaultLayot>
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-center">Home</Text>
      </View>
    </DefaultLayot>
  );
}
