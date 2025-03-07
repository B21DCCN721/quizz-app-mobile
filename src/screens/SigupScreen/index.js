import { Text, View } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import Button from "../../components/Button";

function SigupScreen({navigation}) {
    return ( 
        <DefaultLayot>
            <View className='px-5'>
            <Text>Đăng ký tài khoản</Text>
            <Button title='Đăng ký' sxButton="bg-red" sxText="text-white text-center" onClick={() => navigation.replace("Start")}/>
            </View>
        </DefaultLayot>
    );
}

export default SigupScreen;