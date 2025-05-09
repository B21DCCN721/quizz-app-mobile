import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axiosClient from "../../configs/axiosClient";

export default function ChatPopup({ onClose }) {
  const [messages, setMessages] = useState([]); // [{sender: 'user'|'bot', text: '...'}]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/api/chat/ask-ai", { message: userMsg.text });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Có lỗi xảy ra, vui lòng thử lại sau." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className="absolute inset-0 bg-white z-50 p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Chat hỗ trợ</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-red-500 text-xl">✖</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung chat */}
<ScrollView
  style={{ flex: 1, marginBottom: 8 }}
>
  {messages.map((msg, idx) => (
    <View
      key={idx}
      style={{
        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
        backgroundColor: msg.sender === "user" ? "#007bff" : "#e0e0e0",
        padding: 10,
        borderRadius: 16,
        marginVertical: 4,
        marginHorizontal: 8,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: msg.sender === "user" ? "white" : "black" }}>
        {msg.text}
      </Text>
    </View>
  ))}
</ScrollView>


      {/* Ô nhập + nút gửi */}
      <View className="flex-row items-center border border-gray-300 rounded-lg px-2 py-1">
        <TextInput
          className="flex-1 h-10"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity onPress={sendMessage} disabled={loading}>
          <Text className="text-blue-600 font-semibold px-3">
            {loading ? "..." : "Gửi"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
