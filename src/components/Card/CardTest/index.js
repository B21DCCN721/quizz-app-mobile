import { Text, View } from "react-native";
import Button from "../../Button";
import PropTypes from "prop-types";

//card của danh sách bài thi
//info nhận vào 1 obj chứa thông tin bài thi
//onClickDetail xử lý sự kiện click nút chi tiết
//onClickEnterExam xử lý sự kiện click nút vào thi
function CardTest({info, onClickDetail, onClickEnterExam }) {
    return ( 
        <View className="h-[115px] bg-yellow-2 rounded rounded-20 mt-5 flex flex-row justify-between px-5"  style={{elevation:30}}>
            <View className="flex flex-1 justify-between h-full">
                <Text className="font-interRegular">Tên: {info.name}</Text>
                <Text className="font-interRegular">Mã bài: {info.name}</Text>
                <Text className="font-interRegular">Số câu: {info.name}</Text>
                <Text className="font-interRegular">Lớp: {info.name}</Text>
            </View>
            <View className="flex justify-around h-full">
                <Button title = "Chi tiết" sxButton="bg-red px-8 py-2" sxText="text-white font-interRegular" onClick={onClickDetail}/>
                <Button title = "Vào thi" sxButton="bg-red px-8 py-2" sxText="text-white font-interRegular" onClick={onClickEnterExam}/>
            </View>
        </View>
     );
}

CardTest.propTypes = {
    info: PropTypes.object,
    onClickDetail: PropTypes.func,
    onClickEnterExam: PropTypes.func,
}

export default CardTest;