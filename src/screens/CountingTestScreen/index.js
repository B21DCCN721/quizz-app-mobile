import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View, TextInput } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import { Text, Image } from "react-native";
import Button from "../../components/Button";
import { PaginationTest } from "../../components/Pagination";

function CountAnimalsTestScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [endTest, setEndTest] = useState(false);
  const [prevScreen, setPrevScreen] = useState(false);
  const [nextScreen, setNextScreen] = useState(false);
  const [changeQuestion, setChangeQuestion] = useState(false);
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
    Alert.alert("Thông báo", "Xác nhận nộp bài?", [
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
        <Text className="font-interBold text-2xl my-5">Điền tổng số lượng con vật có trong hình ảnh</Text>
        
        <PaginationTest
          onChangeScreen={(screen) => (screen === 10 ? setEndTest(true) : setEndTest(false))}
          prevScreen={prevScreen}
          nextScreen={nextScreen}
          changeQuestion={changeQuestion}
        />

        {/* Hình ảnh động vật */}
        <View className="flex-row justify-around my-5">
          <Image source={require("../../assets/animal1.png")} className="w-[70px] h-[70px]" />
          <Image source={require("../../assets/animal2.png")} className="w-[70px] h-[70px]" />
          <Image source={require("../../assets/animal3.png")} className="w-[70px] h-[70px]" />
        </View>

        {/* Input điền kết quả */}
        <View className="items-center">
          <TextInput
            className="text-6xl font-interBold text-center border border-gray-300 w-[150px] h-[100px] rounded-20"
            keyboardType="numeric"
            value="3" // bạn có thể thay bằng state nếu cần input thực tế
            editable={false} // đổi thành true nếu muốn người dùng nhập
          />
        </View>

        {/* Nút điều khiển */}
        {endTest ? (
          <Button
            title="Hoàn thành"
            sxButton="bg-pink w-[140px] rounded-20 mx-auto mt-5"
            sxText="text-2xl"
            onClick={handleEndTest}
          />
        ) : (
          <View className="flex-row justify-around mt-10">
            <Button
              title="Thoát trò chơi"
              sxButton="w-[140px] border border-grayBorder"
              sxText="text-[#343B6E]"
              onClick={() => navigation.goBack()}
            />
            <Button
              title="Câu tiếp theo"
              sxButton="w-[140px] border border-grayBorder"
              sxText="text-[#343B6E]"
              onClick={() => {
                setChangeQuestion(true);
                setNextScreen((prev) => !prev);
              }}
            />
          </View>
        )}
      </ScrollView>
    </HeaderLayout>
  );
}

export default CountingTestScreen;
