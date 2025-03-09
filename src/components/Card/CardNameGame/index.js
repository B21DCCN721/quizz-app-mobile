import { View, Text, Pressable } from "react-native";
import PropTypes from "prop-types";

// card ở trang chủ
// onClick nhận vào 1 func xử lý sự kiên khi click vào cardcard
//title tên của card 
function CardNameGame({title = '', children, onClick}) {
    return ( 
        <Pressable className="h-[108px] mt-2 flex justify-center rounded-10 border-4 border-b-8 border-grayBorder relative" onPress={onClick}>
            <Text className="ml-5 font-interBold text-xl text-[#343B6E]">
                {title}
            </Text>
            <View className="absolute right-0 bottom-0">
                {children}
            </View>
        </Pressable>
     );
}

CardNameGame.propTypes = {
    title:PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
}

export default CardNameGame;