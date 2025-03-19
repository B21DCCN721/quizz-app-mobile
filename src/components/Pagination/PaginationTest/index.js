import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const PaginationTest = ({ totalScreen = 10, onChangeScreen=() =>{}, prevScreen, nextScreen }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const handleChangeScreen = (screen) => {
    if (screen >= 1 && screen <= totalScreen) {
        setCurrentScreen(screen);
        onChangeScreen(screen);
      }
  }
  useEffect(() => {
    handleChangeScreen(currentScreen - 1);
  }, [prevScreen]);

  useEffect(() => {
    handleChangeScreen(currentScreen + 1);
  }, [nextScreen]);
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
    onChangeScreen: PropTypes.func,
    prevScreen: PropTypes.bool,
    nextScreen: PropTypes.bool,
}

export default PaginationTest;
