import { CardTest } from "../../../components/Card";
import HeaderLayout from "../../../layouts/HeaderLayout";
import { ScrollView, Text } from "react-native";
import Search from "../../../components/Search";
import { useState } from "react";

function ListTestScreenTeacher({ route }) {
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
      heading = "Danh sách bài thi tô màu";
      break;
    case "demso":
      heading = "Danh sách bài thi đếm số";
      break;
    default:
      break;
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
          <CardTest key={index} info={item} title_1="Chỉnh sửa" title_2="Xóa" />
        ))}
      </ScrollView>
    </HeaderLayout>
  );
}

export default ListTestScreenTeacher;