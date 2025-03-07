import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../../components/Button";
import DefaultLayot from "../../layouts/DefaultLayot";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      navigation.replace("Start");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <DefaultLayot>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text className = 'text-[48px]'>Login</Text>
  
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ width: 250, height: 40, borderBottomWidth: 1, marginBottom: 15 }}
        />
  
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ width: 250, height: 40, borderBottomWidth: 1, marginBottom: 15 }}
        />
  
        <Button title='Đăng nhập' sx="text-cyan-500 p-5 border" onClick={handleLogin}/>
      </View>
    </DefaultLayot>
  );
}
