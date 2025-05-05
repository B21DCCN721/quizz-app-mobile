import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";

const notifications = [
  { id: "1", title: "Comment mới", message: "Học sinh A đã thêm comment vào bài tập B", time: "1 giờ trước" },
  { id: "2", title: "Comment mới", message: "Học sinh B đã thêm comment vào bài tập B", time: "3 giờ trước" },
  { id: "3", title: "Comment mới", message: "Học sinh C đã thêm comment vào bài tập A", time: "Hôm qua" },
];

function NoticeScreen() {
  return (
    <DefaultLayout>
      <Text style={styles.header}>🔔 Thông báo</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📭 Chưa có thông báo mới</Text>
        </View>
      )}
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2C3E50",
  },
  notificationItem: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495E",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default NoticeScreen;
