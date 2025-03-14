import { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import { Text } from "react-native";
import Button from "../../components/Button";

function MultipleChoiceTestScreen({ route, navigation }) {
    const { id, mode } = route.params || {};


    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
            Alert.alert(
                "Thông báo",
                "Thoát sẽ không lưu kết quả bài thi, bạn có chắc chắn muốn thoát?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "OK", onPress: () => navigation.dispatch(e.data.action) }
                ]
            );
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <HeaderLayout>
            <ScrollView>
                <Text className="font-interBold text-2xl my-5">Tên bài thi</Text>
                <Text className="mb-5">Vùng chứa pagination</Text>
                <View className="min-h-[270px] rounded-20 border-b-2 border-grayBorder p-5">
                    <Text className="font-interSemiBold text-xl">Câu hỏi: Lá cờ Việt Nam có màu gì?</Text>
                    <Text className="font-interSemiBold text-xl mt-2">a.xanh</Text>
                    <Text className="font-interSemiBold text-xl mt-2">b.vàng</Text>
                    <Text className="font-interSemiBold text-xl mt-2">c.đỏ</Text>
                    <Text className="font-interSemiBold text-xl mt-2">d.hồng</Text>
                </View>
                <View className="flex-row justify-around my-5">
                    <Button title="A" sxButton="bg-yellow w-[140px] rounded-20" sxText="text-2xl"/>
                    <Button title="B" sxButton="bg-pink w-[140px] rounded-20" sxText="text-2xl"/>
                </View>
                <View className="flex-row justify-around mb-5">
                    <Button title="C" sxButton="bg-blue w-[140px] rounded-20" sxText="text-2xl"/>
                    <Button title="D" sxButton="bg-yellow w-[140px] rounded-20" sxText="text-2xl"/>
                </View>
                <View className="flex-row justify-around mt-5">
                    <Button title="Câu trước" sxButton="w-[120px] border border-grayBorder" sxText="text-[#343B6E]"/>
                    <Button title="Câu tiếp theo" sxButton="w-[120px] border border-grayBorder" sxText="text-[#343B6E]"/>
                </View>
                {/* <Button title="Kết thúc" sxButton="bg-pink w-[140px] rounded-20 mx-auto" sxText="text-2xl"/> */}
            </ScrollView>
        </HeaderLayout>
    );
}

export default MultipleChoiceTestScreen;
