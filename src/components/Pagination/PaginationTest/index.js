import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const PaginationTest = ({ totalScreen = 10, currentScreen = 1, onChangeScreen=() =>{} }) => {
  const handleChangeScreen = (screen) => {
    if (screen >= 1 && screen <= totalScreen) {
      onChangeScreen(screen);
    }
  };

  const renderScreenNumbers = () => {
    const screens = [];
    for (let i = 1; i <= totalScreen; i++) {
      screens.push(
        <TouchableOpacity
          key={i}
          className={`w-[30px] h-[30px] rounded-full flex justify-center bg-grayInput ${
            currentScreen === i ? "bg-white border" : ""
          }`}
          onPress={() => handleChangeScreen(i)}
        >
          <Text className="text-center">{i}</Text>
        </TouchableOpacity>
      );
    }
    return screens;
  };

  return (
    <View className="flex-row justify-between">{renderScreenNumbers()}</View>
  );
};

PaginationTest.propTypes = {
  totalScreen: PropTypes.number,
  currentScreen: PropTypes.number,
  onChangeScreen: PropTypes.func,
};

export default PaginationTest;
