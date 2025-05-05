import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardGame1 from '../../../assets/icons/cardGame1.svg';
import CardGame2 from '../../../assets/icons/cardGame2.svg';
import CardGame3 from '../../../assets/icons/cardGame3.svg';
import { MaterialIcons } from '@expo/vector-icons';

const AssignmentCard = ({ assignment, onPress }) => {
  if (!assignment) return null;

  const getCardStyle = () => {
    switch(assignment.exercise_type) {
      case 1:
        return { IconComponent: CardGame1, color: '#3ad6ce', exercise_type: "Câu hỏi trắc nghiệm" }; // green-2
      case 3:
        return { IconComponent: CardGame2, color: '#FFA5B8', exercise_type: "Trò chơi tô màu" }; // pink-2
      case 2:
        return { IconComponent: CardGame3, color: '#FCA832', exercise_type: "Trò chơi đếm số" }; // orange-3
      default:
        return { IconComponent: CardGame1, color: '#9E9E9E', exercise_type: "Bài tập" }; // default gray
    }
  };

  const { IconComponent, color, exercise_type } = getCardStyle();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.card, { backgroundColor: color}]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconComponent width={48} height={48} />
        </View>
        <View style={styles.info}>
          <Text style={styles.code}>ASS{assignment.id}</Text>
          <Text style={styles.name}>{assignment.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.type}>{exercise_type}   -</Text>
            <Text style={styles.grade}>Lớp {assignment.grade}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  code: {
    fontSize: 12,
    color: '#616161',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#212121',
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
  },
  type: {
    fontSize: 14,
    color: '#424242',
  },
  grade: {
    fontSize: 14,
    color: '#424242',
  },
});

export default AssignmentCard;
