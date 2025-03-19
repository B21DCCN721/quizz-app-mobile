import { View, Text } from "react-native";
import Button from "../../Button";
import PropTypes from "prop-types";
function CardDetail({info, onClickEnterExam}) {
  return (
    <View
      className="h-[207px] bg-yellow-2 rounded rounded-10 border mt-5 flex justify-between p-5"
    >
        <Text className="font-interRegular">Tên: {info.name}</Text>
        <Text className="font-interRegular">Mã bài: {info.code}</Text>
        <Text className="font-interRegular">Số câu: {info.quantity}</Text>
        <Text className="font-interRegular">Thể loại: {info.category}</Text>
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
