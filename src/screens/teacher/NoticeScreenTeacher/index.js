import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'New message',
    message: 'You have received a new message from John',
    time: '2 hours ago',
    icon: '✉️',
  },
  {
    id: '2',
    title: 'Payment received',
    message: 'Your payment of $20 has been processed',
    time: '5 hours ago',
    icon: '💰',
  },
  {
    id: '3',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '4',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '5',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '6',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '7',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '8',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '9',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
  {
    id: '10',
    title: 'Event reminder',
    message: 'Your meeting starts in 30 minutes',
    time: '1 day ago',
    icon: '📅',
  },
];

const NotificationItem = ({ title, message, time, icon }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </View>
);

export default function NotificationScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            message={item.message}
            time={item.time}
            icon={item.icon}
          />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
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