import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View, TextInput, Image } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import { Text } from "react-native";
import Button from "../../components/Button";
import { PaginationTest } from "../../components/Pagination";

function ColorIdentifyInputScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [endTest, setEndTest] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const beforeRemoveListener = useRef(null);

  useEffect(() => {
    beforeRemoveListener.current = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert(
        "Thông báo",
        "Thoát sẽ không lưu kết quả bài thi, bạn có chắc chắn muốn thoát?",
        [
          { text: "Hủy", style: "cancel" },
          { text: "OK", onPress: () => navigation.dispatch(e.data.action) },
        ]
      );
    });

    return () => {
      if (beforeRemoveListener.current) {
        beforeRemoveListener.current();
      }
    };
  }, [navigation]);

  const handleEndTest = () => {
    Alert.alert("Thông báo", `Bạn đã chọn ô số: ${inputValue}\nXác nhận nộp bài?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          if (beforeRemoveListener.current) {
            beforeRemoveListener.current();
          }
          navigation.replace("Result");
        },
      },
    ]);
  };

  return (
    <HeaderLayout>
      <ScrollView>
        <Text className="font-interBold text-2xl my-5">
          Chọn hình có màu khác với những hình còn lại
        </Text>

        <PaginationTest
          onChangeScreen={(screen) => setEndTest(screen === 10)}
          prevScreen={false}
          nextScreen={false}
          changeQuestion={false}
        />

        {/* Hình ảnh bài tập */}
        <Image
          source={require("../../assets/images/different-color-box.png")} // hoặc dùng { uri: '...' }
          className="w-[200px] h-[350px] mx-auto my-6"
          resizeMode="contain"
        />

        {/* Input nhập số thứ tự */}
        <TextInput
          className="border border-gray-400 rounded-xl text-center text-4xl font-interBold mx-auto w-[100px] h-[60px]"
          keyboardType="numeric"
          maxLength={1}
          value={inputValue}
          onChangeText={(text) => {
            const value = text.replace(/[^1-9]/g, ""); // Chỉ cho phép số từ 1-9
            setInputValue(value);
          }}
        />

        {endTest && (
          <Button
            title="Hoàn thành"
            sxButton="bg-pink w-[140px] rounded-20 mx-auto mt-10"
            sxText="text-2xl"
            onClick={handleEndTest}
          />
        )}
      </ScrollView>
    </HeaderLayout>
  );
}

export default ColorTestScreen;
