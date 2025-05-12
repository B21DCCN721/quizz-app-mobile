import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import DefaultLayout from "../../../layouts/DefaultLayout";
import ImgHome from "../../../../assets/imgs/imghome.svg";
import AvatarHomeTeacher from "../../../../assets/imgs/avatarhometeacher.svg";
import { useSelector } from "react-redux";
import StatisticCard from "../../../components/Card/StatisticCard";
import axiosClient from "../../../configs/axiosClient";
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyAttemptsChart from "../../../components/Chart/BarChart";

function HomeScreenTeacher({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.user.id);
  const [assignments, setAssignments] = useState([]);
  const [exerciseStats, setExerciseStats] = useState({
    totalExercises: 0,
    exercisesByType: { tracnghiem: 0, tomau: 0, demso: 0 }
  });
  const [scoreStats, setScoreStats] = useState({
    totalAttempts: 0,
    averageScores: { tracnghiem: 0, tomau: 0, demso: 0 },
  });
  const [submisstionStats, setSubmisstionStats] = useState({
    dailyAttempts: Array.from({ length: 7 }, (_, i) => ({
      date: moment().subtract(6 - i, 'days').format('MM/DD'),
      count: 0
    }))
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await fetchUserData();
          const filteredData = await fetchAssignments();
          await fetchAllSubmissionsStats(filteredData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [userId])
  );

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(`/api/auth/profile/${userId}`);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      setError(error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axiosClient.get('/api/exercises');
      const data = Array.isArray(response.data.exercises) ? response.data.exercises : [];
      const filteredData = data.filter(assignment => assignment.User.id === userId);
      setAssignments(filteredData);

      const counts = { tracnghiem: 0, tomau: 0, demso: 0 };
      filteredData.forEach(item => {
        switch (item.exercise_type) {
          case 1: counts.tracnghiem++; break;
          case 2: counts.tomau++; break;
          case 3: counts.demso++; break;
        }
      });

      setExerciseStats({
        totalExercises: filteredData.length,
        exercisesByType: counts
      });

      return filteredData;
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const fetchAllSubmissionsStats = async (filteredData) => {
    const allSubmissions = [];
    const scoreSums = {
      tracnghiem: { total: 0, count: 0 },
      tomau: { total: 0, count: 0 },
      demso: { total: 0, count: 0 }
    };

    const dailyCounts = {};
    const last7Days = Array.from({ length: 7 }).map((_, i) =>
      moment().subtract(6 - i, 'days').format('MM/DD')
    );

    for (const assignment of filteredData) {
      try {
        const res = await axiosClient.get(`/api/submissions/exercise/${assignment.id}`);
        if (res.data.code === 1 && Array.isArray(res.data.submissions)) {
          for (const sub of res.data.submissions) {
            allSubmissions.push(sub);
            const score = sub.score || 0;
            const type = assignment.exercise_type;

            if (type === 1) {
              scoreSums.tracnghiem.total += score;
              scoreSums.tracnghiem.count++;
            } else if (type === 3) {
              scoreSums.tomau.total += score;
              scoreSums.tomau.count++;
            } else if (type === 2) {
              scoreSums.demso.total += score;
              scoreSums.demso.count++;
            }

            const dateStr = moment(sub.submitted_at).format('MM/DD');
            if (last7Days.includes(dateStr)) {
              dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching submissions for assignment", assignment.id);
      }
    }

    const totalAttempts = allSubmissions.length;

    const averageScores = {
      tracnghiem: scoreSums.tracnghiem.count > 0 ? (scoreSums.tracnghiem.total / scoreSums.tracnghiem.count).toFixed(1) : 0,
      tomau: scoreSums.tomau.count > 0 ? (scoreSums.tomau.total / scoreSums.tomau.count).toFixed(1) : 0,
      demso: scoreSums.demso.count > 0 ? (scoreSums.demso.total / scoreSums.demso.count).toFixed(1) : 0
    };

    const dailyAttempts = last7Days.map(date => ({
      date,
      count: dailyCounts[date] || 0
    }));

    setScoreStats({ totalAttempts, averageScores });
    setSubmisstionStats({ dailyAttempts });
  };

  return (
    <DefaultLayout>
      <ScrollView>
        <View className="flex items-center">
          <ImgHome />
        </View>
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="font-interBold text-xl">Trang chủ</Text>
          </View>
          <View className="flex flex-row items-center mt-5">
            <View>
              <Text className="font-interSemiBold text-right mr-4">
                ✋Xin chào, {user?.name}
              </Text>
              <Text className="font-interLight text-right mr-4">
                Giáo viên
              </Text>
            </View>
            <AvatarHomeTeacher width="36px" height="36px" />
          </View>
        </View>

        {loading ? (
          <View className="flex items-center justify-center py-12">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-2 font-interRegular">Đang tải dữ liệu...</Text>
          </View>
        ) : (
          <>
            <View className="flex flex-row mb-4 mt-4">
              <View className="flex-1 mr-2">
                <StatisticCard
                  title="Tổng số bài tập"
                  value={exerciseStats.totalExercises}
                  backgroundColor="bg-blue-100"
                  icon={<Text className="text-blue-500 text-xl">📚</Text>}
                />
              </View>
              <View className="flex-1 ml-2">
                <StatisticCard
                  title="Tổng lượt làm"
                  value={scoreStats.totalAttempts}
                  backgroundColor="bg-green-100"
                  icon={<Text className="text-green-500 text-xl">👨‍🎓</Text>}
                />
              </View>
            </View>
          </>
        )}

        {/* Dòng 2: Số lượng bài theo dạng */}
        <View className="mb-6">
          <Text className="font-interSemiBold text-lg mb-3">Số lượng bài theo dạng</Text>
          <View className="flex flex-row">
            <View className="flex-1 mr-2">
              <StatisticCard
                title="Quiz"
                value={exerciseStats.exercisesByType.tracnghiem}
                backgroundColor="bg-purple-100"
                icon={<Text className="text-purple-500 text-xl">📝</Text>}
              />
            </View>
            <View className="flex-1 mx-2">
              <StatisticCard
                title="Tô màu"
                value={exerciseStats.exercisesByType.tomau}
                backgroundColor="bg-yellow-100"
                icon={<Text className="text-yellow-500 text-xl">🎨</Text>}
              />
            </View>
            <View className="flex-1 ml-2">
              <StatisticCard
                title="Đếm số"
                value={exerciseStats.exercisesByType.demso}
                backgroundColor="bg-red-100"
                icon={<Text className="text-red-500 text-xl">🔢</Text>}
              />
            </View>
          </View>
        </View>

        {/* Dòng 3: Điểm trung bình */}
        <View className="mb-6">
          <Text className="font-interSemiBold text-lg mb-3">Điểm trung bình theo dạng bài</Text>
          <View className="p-4 bg-white rounded-lg shadow">
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-interRegular">Trắc nghiệm</Text>
              <Text className="font-interBold">{scoreStats.averageScores.tracnghiem}/100</Text>
            </View>
            <View className="bg-gray-200 h-2 rounded-full mb-4">
              <View
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min(scoreStats.averageScores.tracnghiem, 100)}%` }}
              />
            </View>

            <View className="flex flex-row justify-between mb-2">
              <Text className="font-interRegular">Tô màu</Text>
              <Text className="font-interBold">{scoreStats.averageScores.tomau}/100</Text>
            </View>
            <View className="bg-gray-200 h-2 rounded-full mb-4">
              <View
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${Math.min(scoreStats.averageScores.tomau, 100)}%` }}
              />
            </View>

            <View className="flex flex-row justify-between mb-2">
              <Text className="font-interRegular">Đếm số</Text>
              <Text className="font-interBold">{scoreStats.averageScores.demso}/100</Text>
            </View>
            <View className="bg-gray-200 h-2 rounded-full">
              <View
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min(scoreStats.averageScores.demso, 100)}%` }}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <DailyAttemptsChart data={submisstionStats.dailyAttempts} />
        </View>
      </ScrollView>
    </DefaultLayout>
  );
}

export default HomeScreenTeacher;
