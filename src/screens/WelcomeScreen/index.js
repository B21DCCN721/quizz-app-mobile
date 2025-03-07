import { Image, View } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import Button from "../../components/Button";

function WelcomeScreen({navigation}) {
    return ( 
        <DefaultLayot>
            <View className='flex flex-1 justify-center items-center mt-14'>
                <Image className="w-[293px] h-[236px]" source={require("../../../assets/imgs/imgwelcome.png")} />
                <View className='flex flex-1 w-full items-center mt-5'>
                    <Button title='Đăng nhập' sxButton="bg-yellow w-[224px] rounded-[50px] mt-10" sxText="text-center" onClick={() => navigation.navigate("Login")}/>
                    <Button title='Đăng ký' sxButton="bg-blue  w-[224px] rounded-[50px] mt-5" sxText="text-center" onClick={() => navigation.navigate("Sigup")}/>
                </View>
            </View>
        </DefaultLayot>
    );
}

export default WelcomeScreen;