import { CardTest } from "../../components/Card";
import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text } from "react-native";
import Search from "../../components/Search";
import { useState } from "react";

/*
dựa vào từng case trong handleClickStart để chuyển hướng đến bài test tương ứng với trò chơi, dựa vào id và mode để xác định id và thể loại
*/

function ListTestScreen({ route, navigation }) {
  const info = [
    {
      id: 1,
      name: "abc",
      code: "ABC",
      quantity: 10,
      grade: 5,
      category: "trắc nghiệm",
    },
    {
      id: 2,
      name: "abc",
      code: "ABC",
      quantity: 10,
      grade: 44,
      category: "trắc nghiệm",
    },
    {
      id: 3,
      name: "abc",
      code: "ABC",
      quantity: 10,
      grade: 1,
      category: "trắc nghiệm",
    },
  ];
  const [valueSelect, setValueSelect] = useState(null);
  const itemsSelect = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "js" },
  ];
  const [valueInput, setValueInput] = useState("");
  const { mode } = route.params || {};
  let heading = "";
  switch (mode) {
    case "tracnghiem":
      heading = "Danh sách bài thi trắc nghiệm";
      break;
    case "tomau":
      heading = "Danh sách bài thi đoán màu";
      break;
    case "demso":
      heading = "Danh sách bài thi đếm số";
      break;
    default:
      break;
  }
  const handleClickDetail = (id, mode) => {
    navigation.navigate("DetailTest", { mode: mode, id: id });
  };

  const handleClickStart = (id, mode) => {
    switch (mode) {
      case "tracnghiem":
        navigation.navigate("MultipleChoice", { mode: mode, id: id });
        break;
      case "tomau":

        break;
      case "demso":
        
      break;
      default:
        break;
    }
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
        {info.map((item, index) => (
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
