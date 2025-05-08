import { useEffect, useState, useRef } from "react";
import { Alert, ScrollView, View, ActivityIndicator, TextInput, Image } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import { Text } from "react-native";
import Button from "../../components/Button";
import { PaginationTest } from "../../components/Pagination";
import axiosClient from "../../configs/axiosClient";
import { setDataResult } from "../../store/slices/dataResultTestSlice";
import { useDispatch } from "react-redux";


function CountingTestScreen({ route, navigation }) {
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
  const currentItem = infoTest?.CountingQuestions?.slice(
    (currentPage - 1) * PageSize,
    currentPage * PageSize
  );
  const totalPages = Math.ceil(infoTest?.CountingQuestions?.length / PageSize) || 0;

  // state lưu trả lời câu hỏi
  const [answers, setAnswers] = useState([]);

  const handleInputAnswer = (text) => {
    const currentQuestionId = currentItem[0]?.id;
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (ans) => ans.questionId === currentQuestionId
      );

      if (existingAnswer) {
        return prevAnswers.map((ans) =>
          ans.questionId === currentQuestionId
            ? { ...ans, answer: text }
            : ans
        );
      } else {
        return [
          ...prevAnswers,
          {
            questionId: currentQuestionId,
            answer: text,
          },
        ];
      }
    });
  };

  // Thông báo khi thoát làm bài
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
          console.log('API Response:', response.data.exercise);
          console.log('Current Item:', response.data.exercise.CountingQuestions?.[0]);
          setInfoTest(response.data.exercise);
          setLoading(false);
        }
      } catch (error) {
        console.error('API Error:', error);
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
      Alert.alert("Thông báo", "Bạn chưa trả lời câu hỏi nào")
      return;
    }
    try {
      const response = await axiosClient.post(`/api/student/submit/counting`,{
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
      <ScrollView>
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
            Câu hỏi: {currentItem[0]?.question}
          </Text>
          {currentItem[0]?.image_url && (
            <>
              <Text>Image URL: {currentItem[0].image_url}</Text>
              <Image 
                source={{ uri: currentItem[0].image_url }}
                style={{ width: '100%', height: 200, marginVertical: 10, borderRadius: 8 }}
                resizeMode="contain"
                onError={(error) => console.error('Image loading error:', error.nativeEvent)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </>
          )}
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 mt-4"
            placeholder="Nhập đáp án của bạn"
            value={answers.find(a => a.questionId === currentItem[0]?.id)?.answer || ''}
            onChangeText={handleInputAnswer}
            keyboardType="numeric"
          />
        </View>

        {endTest ? (
          <Button
            title="Kết thúc"
            sxButton="bg-pink w-[140px] rounded-20 mx-auto"
            sxText="text-2xl"
            onClick={handleEndTest}
          />
        ) : (
          <View className="flex-row justify-around mt-5">
            <Button
              title="Câu trước"
              sxButton="w-[120px] border border-grayBorder"
              sxText="text-[#343B6E]"
              onClick={() => {
                setChangeQuestion(true);
                setPrevScreen((prev) => !prev);
              }}
            />
            <Button
              title="Câu tiếp theo"
              sxButton="w-[120px] border border-grayBorder"
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