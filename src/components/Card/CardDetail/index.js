import { View, Text } from "react-native";
import Button from "../../Button";
import PropTypes from "prop-types";
import generateCodeTest from "../../../helpers/generateCodeTest";
function CardDetail({info, onClickEnterExam}) {
  let type = "";
  let category = "";
  switch (info.exercise_type) {
    case 1:
      type = "Trắc nghiệm";
      category = "MultipleChoiceQuestions"
      break;
    case 2:
      type = "Đếm số";
      category = "CountingQuestions"
      break;
    case 3:
      type = "Đoán màu";
      category = "ColorQuestions"
      break;
    default:
      break;
  }
  return (
    <View
      className="h-[207px] bg-yellow-2 rounded-10 border border-amber-300 mt-5 flex justify-between p-5"
    >
        <Text className="font-interRegular">Tên: {info.title}</Text>
        <Text className="font-interRegular">Mã bài: {generateCodeTest(info.id)}</Text>
        <Text className="font-interRegular">Số câu: {info[category].length}</Text>
        <Text className="font-interRegular">Thể loại: {type}</Text>
        <Text className="font-interRegular">Lớp: {info.grade}</Text>
        <Button
          title="Vào thi"
          sxButton="bg-red py-2 w-1/3"
          sxText="text-white font-interRegular"
          onClick={onClickEnterExam}
        />
    </View>
  );
}

CardDetail.propTypes = {
  info: PropTypes.object,
  onClickEnterExam: PropTypes.func,
}

export default CardDetail;
