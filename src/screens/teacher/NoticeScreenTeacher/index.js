import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axiosClient from '../../../configs/axiosClient';

const NotificationItem = ({ content, time, type, exerciseTitle }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.icon}>{type === 'comment' ? '💬' : '🔔'}</Text>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{exerciseTitle || 'Thông báo'}</Text>
      <Text style={styles.message}>{content}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </View>
);

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/api/notifications');
      setNotifications(response.data.data || []);
    } catch (error) {
      console.error('Lỗi khi tải thông báo:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mỗi lần màn hình được focus, fetch lại data
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    return date.toLocaleString('vi-VN');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E7784C" />
      ) : notifications.length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 16, color: '#999' }}>
          Không có thông báo nào
        </Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem
              content={item.content}
              time={formatTime(item.sentTime)}
              type={item.notificationType}
              exerciseTitle={item.Exercise?.title}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 29,
  },
  header: {
    fontFamily: 'inter',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E7784C',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});