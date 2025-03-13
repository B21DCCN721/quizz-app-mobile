import { Text, View } from "react-native";
import Button from "../../Button";
import PropTypes from "prop-types";

//card của danh sách bài thi
//info nhận vào 1 obj chứa thông tin bài thi
//onClickDetail xử lý sự kiện click nút chi tiết
//onClickEnterExam xử lý sự kiện click nút vào thi
function CardTest({info, onClickButton_1, onClickButton_2, title_1, title_2 }) {
    return ( 
        <View className="h-[115px] bg-yellow-2 rounded rounded-20 mt-5 flex flex-row justify-between px-5"  style={{elevation:10}}>
            <View className="flex flex-1 justify-between h-full">
                <Text className="font-interRegular">Tên: {info.name}</Text>
                <Text className="font-interRegular">Mã bài: {info.code}</Text>
                <Text className="font-interRegular">Số câu: {info.quantity}</Text>
                <Text className="font-interRegular">Lớp: {info.grade}</Text>
            </View>
            <View className="flex justify-around h-full">
                <Button title = {title_1} sxButton="bg-red px-8 py-2" sxText="text-white font-interRegular" onClick={onClickButton_1}/>
                <Button title = {title_2} sxButton="bg-red px-8 py-2" sxText="text-white font-interRegular" onClick={onClickButton_2}/>
            </View>
        </View>
     );
}

CardTest.propTypes = {
    info: PropTypes.object,
    onClickButton_1: PropTypes.func,
    onClickButton_2: PropTypes.func,
    title_1: PropTypes.string,
    title_2: PropTypes.string,
}

export default CardTest;