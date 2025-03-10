import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text } from "react-native";

function ListTestScreen({route}) {
    const { mode } = route.params || {};
    return (  
        <HeaderLayout>
            <ScrollView className="px-5">
                <Text>{mode}</Text>
            </ScrollView>
        </HeaderLayout>
    );
}

export default ListTestScreen;