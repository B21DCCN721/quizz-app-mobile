// // ForgotPasswordScreen.js
// import React, { useState } from "react";
// import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "./firebase"; // đường dẫn đến firebase.js

// export default function ForgotPasswordScreen() {
//   const [email, setEmail] = useState("");

//   const handleResetPassword = async () => {
//     if (!email) {
//       Alert.alert("Lỗi", "Vui lòng nhập email.");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, email);
//       Alert.alert("Thành công", "Email đặt lại mật khẩu đã được gửi.");
//     } catch (error) {
//       Alert.alert("Lỗi", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Quên mật khẩu</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         onChangeText={setEmail}
//         value={email}
//       />
//       <Button title="Gửi email đặt lại" onPress={handleResetPassword} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, justifyContent: "center" },
//   title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
//   input: {
//     borderBottomWidth: 1, marginBottom: 20, fontSize: 16, padding: 8,
//   },
// });

