import { View, Text } from "react-native";
import Button from "../../Button";
function CardDetail({info, onClickEnterExam}) {
  return (
    <View
      className="h-[207px] bg-yellow-2 rounded rounded-10 border mt-5 flex justify-between p-5"
    >
        <Text className="font-interRegular">Tên: {info.name}</Text>
        <Text className="font-interRegular">Mã bài: {info.name}</Text>
        <Text className="font-interRegular">Số câu: {info.name}</Text>
        <Text className="font-interRegular">Thể loại: {info.name}</Text>
        <Text className="font-interRegular">Lớp: {info.name}</Text>
        <Button
          title="Vào thi"
          sxButton="bg-red py-2 w-1/3"
          sxText="text-white font-interRegular"
          onClick={onClickEnterExam}
        />
    </View>
  );
}

export default CardDetail;
