import { useEffect, useState, useRef } from "react";
import { Alert, ScrollView, View, ActivityIndicator } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import { Text } from "react-native";
import Button from "../../components/Button";
import { PaginationTest } from "../../components/Pagination";
import axiosClient from "../../configs/axiosClient";
import { setDataResult } from "../../store/slices/dataResultTestSlice";
import { useDispatch } from "react-redux";
function MultipleChoiceTestScreen({ route, navigation }) {
  const { id, mode } = route.params || {};
  const [prevScreen, setPrevScreen] = useState(false);
  const [nextScreen, setNextScreen] = useState(false);
  const [endTest, setEndTest] = useState(false);
  const [changeQuestion, setChangeQuestion] = useState(false);
  const beforeRemoveListener = useRef(null);
  const [infoTest, setInfoTest] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // phân trang
  const PageSize = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const currentItem = infoTest?.MultipleChoiceQuestions?.slice(
    (currentPage - 1) * PageSize,
    currentPage * PageSize
  );
  const totalPages =
    Math.ceil(infoTest?.MultipleChoiceQuestions?.length / PageSize) || 0;
  // state lưu trả lời câu hỏi
  const [answers, setAnswers] = useState([]);
  const handleSelectAnswer = (answerId) => {
    const currentQuestionId = currentItem[0]?.id;
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (ans) => ans.questionId === currentQuestionId
      );

      if (existingAnswer) {
        // Nếu đã chọn câu này rồi thì update lại selectedAnswer
        return prevAnswers.map((ans) =>
          ans.questionId === currentQuestionId
            ? { ...ans, selectedAnswer: answerId }
            : ans
        );
      } else {
        // Nếu chưa chọn câu này thì thêm mới
        return [
          ...prevAnswers,
          {
            questionId: currentQuestionId,
            selectedAnswer: answerId,
          },
        ];
      }
    });
  };
  // thông báo khi thoát làm bài
  useEffect(() => {
    beforeRemoveListener.current = navigation.addListener(
      "beforeRemove",
      (e) => {
        e.preventDefault();
        Alert.alert(
          "Thông báo",
          "Thoát sẽ không lưu kết quả bài thi, bạn có chắc chắn muốn thoát?",
          [
            { text: "Hủy", style: "cancel" },
            { text: "OK", onPress: () => navigation.dispatch(e.data.action) },
          ]
        );
      }
    );

    return () => {
      if (beforeRemoveListener.current) {
        beforeRemoveListener.current();
      }
    };
  }, [navigation]);

  // call api get info test
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(
          `/api/exercises/${id}?type=${mode}`
        );
        if (response.status === 200) {
          setInfoTest(response.data.exercise);
          setLoading(false);
        }
      } catch (error) {
        setError(
          err.response
            ? err.response.data
            : "Something went wrong at detail test screen"
        );
      }
    };
    getData();
  }, []);
  // call api nộp bài thi
  const handleSubmitTest = async () => {
    if(answers.length === 0) {
      Alert.alert("Thông báo", "Bạn chưa chọn câu trả lời nào vui lòng chọn câu trả lời trước khi nộp bài")
      return;
    }
    try {
      const response = await axiosClient.post(`/api/student/submit/multiple-choice`,{
        exerciseId: id,
        answers
      })
      if(response.status === 200) {
        dispatch(setDataResult(response.data.result));
        Alert.alert("Thông báo", "Nộp bài thành công", [
          { text: "OK", onPress: () => navigation.replace("Result") },
        ]);
      }
    } catch (error) {
      console.error("Lỗi khi nộp bài thi:", error);
      Alert.alert("Lỗi", "Không thể nộp bài thi.");
    }
  };
  const handleEndTest = () => {
    Alert.alert("Thông báo", "Xác nhận nộp bài?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          if (beforeRemoveListener.current) {
            beforeRemoveListener.current();
          }
          handleSubmitTest();
        },
      },
    ]);
  };
  if (loading) {
    return (
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </HeaderLayout>
    );
  }
  return (
    <HeaderLayout>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Text className="font-interBold text-2xl my-5">{infoTest.title}</Text>
        <PaginationTest
          onChangeScreen={(screen) => {
            screen === totalPages ? setEndTest(true) : setEndTest(false);
            setCurrentPage(screen);
          }}
          prevScreen={prevScreen}
          nextScreen={nextScreen}
          changeQuestion={changeQuestion}
          totalScreen={totalPages}
        />
        <View className="min-h-[270px] rounded-20 border-b-2 border-grayBorder p-5">
          <Text className="font-interSemiBold text-xl">
            Câu hỏi:{currentItem[0]?.question}
          </Text>
          <Text className="font-interSemiBold text-xl mt-2">
            a. {currentItem[0]?.MultipleChoiceAnswers[0]?.answer_text}
          </Text>
          <Text className="font-interSemiBold text-xl mt-2">
            b. {currentItem[0]?.MultipleChoiceAnswers[1]?.answer_text}
          </Text>
          <Text className="font-interSemiBold text-xl mt-2">
            c. {currentItem[0]?.MultipleChoiceAnswers[2]?.answer_text}
          </Text>
          <Text className="font-interSemiBold text-xl mt-2">
            d. {currentItem[0]?.MultipleChoiceAnswers[3]?.answer_text}
          </Text>
        </View>
        <View className="flex-row justify-around my-5">
          <Button
            title="A"
            sxButton={`w-[140px] rounded-20 ${
              answers.find((a) => a.questionId === currentItem[0]?.id)
                ?.selectedAnswer ===
              currentItem[0]?.MultipleChoiceAnswers[0]?.id
                ? "bg-yellow/40 border border-red"
                : "bg-yellow"
            }`}
            sxText="text-2xl"
            onClick={() =>
              handleSelectAnswer(currentItem[0]?.MultipleChoiceAnswers[0]?.id)
            }
          />
          <Button
            title="B"
            sxButton={`w-[140px] rounded-20 ${
              answers.find((a) => a.questionId === currentItem[0]?.id)
                ?.selectedAnswer ===
              currentItem[0]?.MultipleChoiceAnswers[1]?.id
                ? "bg-pink/40 border border-red"
                : "bg-pink"
            }`}
            sxText="text-2xl"
            onClick={() =>
              handleSelectAnswer(currentItem[0]?.MultipleChoiceAnswers[1]?.id)
            }
          />
        </View>
        <View className="flex-row justify-around mb-5">
          <Button
            title="C"
            sxButton={`w-[140px] rounded-20 ${
              answers.find((a) => a.questionId === currentItem[0]?.id)
                ?.selectedAnswer ===
              currentItem[0]?.MultipleChoiceAnswers[2]?.id
                ? "bg-blue/40 border border-red"
                : "bg-blue"
            }`}
            sxText="text-2xl"
            onClick={() =>
              handleSelectAnswer(currentItem[0]?.MultipleChoiceAnswers[2]?.id)
            }
          />
          <Button
            title="D"
            sxButton={`w-[140px] rounded-20 ${
              answers.find((a) => a.questionId === currentItem[0]?.id)
                ?.selectedAnswer ===
              currentItem[0]?.MultipleChoiceAnswers[3]?.id
                ? "bg-yellow/40 border border-red"
                : "bg-yellow"
            }`}
            sxText="text-2xl"
            onClick={() =>
              handleSelectAnswer(currentItem[0]?.MultipleChoiceAnswers[3]?.id)
            }
          />
        </View>

        {endTest ? (
          <Button
            title="Kết thúc"
            sxButton="bg-pink w-[140px] rounded-20 mx-auto mb-5"
            sxText="text-2xl"
            onClick={handleEndTest}
          />
        ) : (
          <View className="flex-row justify-around mt-5">
            <Button
              title="Câu trước"
              sxButton="w-[120px] border border-grayBorder mb-5"
              sxText="text-[#343B6E]"
              onClick={() => {
                setChangeQuestion(true);
                setPrevScreen((prev) => !prev);
              }}
            />
            <Button
              title="Câu tiếp theo"
              sxButton="w-[120px] border border-grayBorder mb-5"
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

export default MultipleChoiceTestScreen;
