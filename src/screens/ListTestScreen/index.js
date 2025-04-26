import { CardTest } from "../../components/Card";
import HeaderLayout from "../../layouts/HeaderLayout";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axiosClient";

/*
dựa vào từng case trong handleClickStart để chuyển hướng đến bài test tương ứng với trò chơi, dựa vào id và mode để xác định id và thể loại
*/

function ListTestScreen({ route, navigation }) {
  const [listTest, setListTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valueSelect, setValueSelect] = useState("");
  const itemsSelect = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const [valueInput, setValueInput] = useState("");
  const { mode } = route.params || {};
  let heading = "";
  switch (mode) {
    case "1":
      heading = "Danh sách bài thi trắc nghiệm";
      break;
    case "2":
      heading = "Danh sách bài thi đếm số";
      break;
    case "3":
      heading = "Danh sách bài thi đoán màu";
      break;
    default:
      break;
  }
  const handleClickDetail = (id, mode) => {
    navigation.navigate("DetailTest", { mode: mode, id: id });
  };

  const handleClickStart = (id, mode) => {
    switch (mode) {
      case "1":
        navigation.navigate("MultipleChoice", { mode: mode, id: id });
        break;
      case "2":
        break;
      case "3":
        break;
      default:
        break;
    }
  };
  // call api
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(`/api/exercises?type=${mode}&grade=${valueSelect}&search=${valueInput}`);
        if (response.status === 200) {
          setListTest(response.data.exercises);
          setLoading(false);
        }
      } catch (err) {
        setError(err.response ? err.response.data : "Something went wrong at list test screen");
      }
    };
    getData();
  }, [mode, valueSelect, valueInput]);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Search
          valueSelect={valueSelect}
          setValueSelect={setValueSelect}
          itemsSelect={itemsSelect}
          valueInput={valueInput}
          onChange={setValueInput}
        />
        <Text className="font-interBold text-xl my-3">{heading}</Text>
        {listTest.map((item, index) => (
          <CardTest
            key={index}
            info={item}
            title_1="Chi tiết"
            title_2="Vào thi"
            onClickButton_1={() => handleClickDetail(item.id, mode)}
            onClickButton_2={() => handleClickStart(item.id, mode)}
          />
        ))}
      </ScrollView>
    </HeaderLayout>
  );
}

export default ListTestScreen;
