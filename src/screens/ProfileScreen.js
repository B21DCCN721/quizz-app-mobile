import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>👤 Profile Screen</Text>

      <TouchableOpacity 
        onPress={() => navigation.replace("Login")}
        style={{ marginTop: 20, backgroundColor: "red", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
