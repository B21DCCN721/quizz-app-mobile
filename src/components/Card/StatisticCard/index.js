import React from "react";
import { View, Text } from "react-native";

const StatisticCard = ({ title, value, icon, backgroundColor }) => {
  return (
    <View className={`p-4 rounded-lg mb-4 ${backgroundColor}`}>
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="font-interRegular text-gray-600 mb-1">{title}</Text>
          <Text className="font-interBold text-2xl">{value}</Text>
        </View>
        <View className="bg-white p-2 rounded-full">{icon}</View>
      </View>
    </View>
  );
};

export default StatisticCard;