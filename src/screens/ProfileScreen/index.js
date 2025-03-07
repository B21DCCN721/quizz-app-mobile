import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";

export default function ProfileScreen({ navigation }) {
  return (
    <DefaultLayot>
      <View className = 'flex flex-1 px-2 justify-center items-center bg-cyan-500'>
        <Text style={{ fontSize: 24 }}>Profile Screen</Text>
  
        <TouchableOpacity 
          onPress={() => navigation.replace("Login")}
          style={{ marginTop: 20, backgroundColor: "red", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DefaultLayot>
  );
}
