// import { useEffect, useState } from "react";
// import { View, ScrollView, ActivityIndicator, Image } from "react-native";
// import { Text } from "react-native";
// import HeaderLayout from "../../layouts/HeaderLayout";
// import axiosClient from "../../configs/axiosClient";


// function RankScreen() {
//   const [loading, setLoading] = useState(true);
//   const [rankings, setRankings] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRankings = async () => {
//       try {
//         const response = await axiosClient.get("/api/student/rankings");
//         if (response.status === 200) {
//           setRankings(response.data.rankings);
//           setLoading(false);
//         }
//       } catch (err) {
//         setError(
//           err.response
//             ? err.response.data
//             : "Something went wrong while fetching rankings"
//         );
//         setLoading(false);
//       }
//     };

//     fetchRankings();
//   }, []);

//   const getRankBadge = (rank) => {
//     switch (rank) {
//       case 1:
//         return {
//           badge: require("../../../assets/imgs/goldmedal.svg"),
//           color: '#FFD700',
//           label: 'Hạng nhất'
//         };
//       case 2:
//         return {
//           badge: require("../../../assets/imgs/silvermedal.svg"),
//           color: '#C0C0C0',
//           label: 'Hạng nhì'
//         };
//       case 3:
//         return {
//           badge: require("../../../assets/imgs/bronzemedal.svg"),
//           color: '#CD7F32',
//           label: 'Hạng ba'
//         };
//       default:
//         return {
//           badge: null,
//           color: '#9E9E9E',
//           label: `Hạng ${rank}`
//         };
//     }
//   };

//   if (loading) {
//     return (
//       <HeaderLayout>
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       </HeaderLayout>
//     );
//   }

//   if (error) {
//     return (
//       <HeaderLayout>
//         <View className="flex-1 justify-center items-center">
//           <Text className="text-red-500 text-lg">{error}</Text>
//         </View>
//       </HeaderLayout>
//     );
//   }

//   return (
//     <HeaderLayout>
//       <View className="flex-1 bg-white">
//         <Text className="font-interBold text-2xl text-center my-5">
//           Bảng Xếp Hạng
//         </Text>

//         <ScrollView className="flex-1">
//           {rankings.map((item, index) => (
//             <View
//               key={item.id}
//               className={`flex-row items-center justify-between p-4 mx-4 my-2 rounded-lg ${
//                 index < 3 ? "bg-yellow-50" : "bg-gray-50"
//               }`}
//             >
//               <View className="flex-row items-center flex-1">
//                 <View className="w-8 h-8 justify-center items-center mr-3">
//                   {index < 3 ? (
//                     <Image
//                       source={getRankBadge(index + 1)}
//                       className="w-6 h-6"
//                       resizeMode="contain"
//                     />
//                   ) : (
//                     <Text className="font-interBold text-lg text-gray-600">
//                       {index + 1}
//                     </Text>
//                   )}
//                 </View>

//                 <View className="flex-1">
//                   <Text className="font-interSemiBold text-base">
//                     {item.name}
//                   </Text>
//                   {/* <Text className="font-interRegular text-sm text-gray-500">
//                     Lớp: {item.grade}
//                   </Text> */}
//                 </View>

//                 <View className="items-end">
//                   <Text className="font-interBold text-lg text-blue-600">
//                     {item.score} điểm
//                   </Text>
//                   {/* <Text className="font-interRegular text-sm text-gray-500">
//                     Hoàn thành: {item.completedExercises} bài
//                   </Text> */}
//                 </View>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </HeaderLayout>
//   );
// }

// export default RankScreen;





import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Image, Animated } from "react-native";
import { Text } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import axiosClient from "../../configs/axiosClient";

const THEME_COLORS = {
  primary: "#4A89DC", // Xanh dương nhạt
  secondary: "#8CC152", // Xanh lá cây
  accent: "#FC6E51", // Cam
  background: "#F5F7FA", // Xám nhạt
  gold: "#FFCD00", // Vàng huy chương
  silver: "#C0C0C0", // Bạc
  bronze: "#CD7F32", // Đồng
  text: "#434A54", // Xám đậm
  lightText: "#AAB2BD", // Xám nhạt hơn
};

// Component huy chương animation
const MedalWithAnimation = ({ rank, size = 50 }) => {
  const scaleAnim = useState(new Animated.Value(1))[0];
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getMedalImage = () => {
    switch (rank) {
      case 1:
        return require("../../../assets/imgs/goldmedal.svg");
      case 2:
        return require("../../../assets/imgs/silvermedal.svg");
      case 3:
        return require("../../../assets/imgs/bronzemedal.svg");
      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={getMedalImage()}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

// Component hiển thị điểm số với animation
const ScoreDisplay = ({ score }) => {
  return (
    <View className="bg-blue-100 px-4 py-2 rounded-full">
      <Text className="font-interBold text-lg text-blue-600">
        {score} sao
      </Text>
    </View>
  );
};

// Component item trong bảng xếp hạng
const RankingItem = ({ item, index }) => {
  const getRankInfo = (rank) => {
    switch (rank) {
      case 1:
        return {
          color: THEME_COLORS.gold,
          background: "bg-yellow-50",
          label: "Siêu sao",
        };
      case 2:
        return {
          color: THEME_COLORS.silver,
          background: "bg-gray-100",
          label: "Ngôi sao",
        };
      case 3:
        return {
          color: THEME_COLORS.bronze,
          background: "bg-orange-50",
          label: "Tài năng",
        };
      default:
        return {
          color: THEME_COLORS.lightText,
          background: "bg-white",
          label: `Hạng ${rank}`,
        };
    }
  };

  const rankInfo = getRankInfo(index + 1);

  return (
    <View
      className={`flex-row items-center justify-between p-4 mx-3 my-2 rounded-2xl ${
        rankInfo.background
      } shadow-sm border border-gray-100`}
    >
      <View className="flex-row items-center flex-1">
        {/* Phần hiển thị huy chương hoặc số thứ tự */}
        <View className="w-12 h-12 justify-center items-center mr-3">
          {index < 3 ? (
            <MedalWithAnimation rank={index + 1} />
          ) : (
            <View
              className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center"
              style={{ backgroundColor: "#E6E9ED" }}
            >
              <Text className="font-interBold text-lg" style={{ color: THEME_COLORS.text }}>
                {index + 1}
              </Text>
            </View>
          )}
        </View>

        {/* Phần thông tin học sinh */}
        <View className="flex-1">
          <Text className="font-interBold text-base" style={{ color: THEME_COLORS.text }}>
            {item.name}
          </Text>
          <Text
            className="font-interRegular text-sm"
            style={{ color: rankInfo.color }}
          >
            {rankInfo.label}
          </Text>
        </View>

        {/* Phần điểm số */}
        <ScoreDisplay score={item.score} />
      </View>
    </View>
  );
};

// Component header của bảng xếp hạng
const RankingHeader = () => {
  return (
    <View className="items-center justify-center py-4">
      <View className="flex-row items-center justify-center">
        <Image
          source={require("../../../assets/imgs/goldmedal.svg")}
          className="w-8 h-8 mr-2"
          resizeMode="contain"
        />
        <Text className="font-interBold text-2xl" style={{ color: THEME_COLORS.primary }}>
          Bảng Xếp Hạng Siêu Sao
        </Text>
        <Image
          source={require("../../../assets/imgs/goldmedal.svg")}
          className="w-8 h-8 ml-2"
          resizeMode="contain"
        />
      </View>
      <Text className="font-interRegular text-sm mt-1" style={{ color: THEME_COLORS.lightText }}>
        Hãy học tập chăm chỉ để leo lên Top bảng xếp hạng nhé!
      </Text>
    </View>
  );
};

// Component loading thân thiện với trẻ em
const KidFriendlyLoading = () => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => dots.length >= 3 ? '.' : dots + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="w-16 h-16 bg-blue-100 rounded-full justify-center items-center mb-4">
        <View className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </View>
      <Text className="font-interMedium text-lg" style={{ color: THEME_COLORS.primary }}>
        Đang tải bảng xếp hạng{dots}
      </Text>
    </View>
  );
};

// Component hiển thị lỗi thân thiện
const KidFriendlyError = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="w-20 h-20 rounded-full bg-red-100 justify-center items-center mb-4">
        <Text className="text-4xl">😢</Text>
      </View>
      <Text className="font-interMedium text-lg text-center" style={{ color: THEME_COLORS.accent }}>
        Ôi không! Có lỗi xảy ra.
      </Text>
      <Text className="font-interRegular text-base text-center mt-2" style={{ color: THEME_COLORS.text }}>
        {message}
      </Text>
      <View className="mt-4 bg-blue-500 px-6 py-3 rounded-full">
        <Text className="font-interBold text-white">Thử lại</Text>
      </View>
    </View>
  );
};

// Component chính
function RankScreen() {
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axiosClient.get("/api/student/rankings");
        if (response.status === 200) {
          setRankings(response.data.rankings);
          setLoading(false);
        }
      } catch (err) {
        setError(
          err.response
            ? err.response.data
            : "Không thể tải bảng xếp hạng. Hãy thử lại sau nhé!"
        );
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) {
    return (
      <HeaderLayout>
        <KidFriendlyLoading />
      </HeaderLayout>
    );
  }

  if (error) {
    return (
      <HeaderLayout>
        <KidFriendlyError message={error} />
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <View className="flex-1" style={{ backgroundColor: THEME_COLORS.background }}>
        <RankingHeader />

        {/* Top 3 học sinh */}
        {rankings.length > 0 && (
          <View className="flex-row justify-center items-end px-4 py-2 mb-2">
            {/* Top 2 */}
            {rankings.length > 1 && (
              <View className="items-center mx-2">
                <View className="w-16 h-16 rounded-full bg-silver-100 border-2 border-gray-200 justify-center items-center">
                  <Text className="text-xl font-interBold" style={{ color: THEME_COLORS.silver }}>2</Text>
                </View>
                <MedalWithAnimation rank={2} size={30} />
                <Text className="font-interSemiBold text-sm mt-1" numberOfLines={1} style={{ maxWidth: 80 }}>
                  {rankings[1]?.name}
                </Text>
                <View className="bg-gray-200 px-2 py-1 rounded-full mt-1">
                  <Text className="font-interBold text-sm text-gray-700">
                    {rankings[1]?.score}
                  </Text>
                </View>
              </View>
            )}

            {/* Top 1 */}
            <View className="items-center mx-2 -mb-4">
              <View className="w-20 h-20 rounded-full bg-yellow-100 border-2 border-yellow-400 justify-center items-center">
                <Text className="text-2xl font-interBold" style={{ color: THEME_COLORS.gold }}>1</Text>
              </View>
              <MedalWithAnimation rank={1} size={40} />
              <Text className="font-interBold text-base mt-1" numberOfLines={1} style={{ maxWidth: 90 }}>
                {rankings[0]?.name}
              </Text>
              <View className="bg-yellow-100 px-3 py-1 rounded-full mt-1">
                <Text className="font-interBold text-sm text-yellow-700">
                  {rankings[0]?.score}
                </Text>
              </View>
            </View>

            {/* Top 3 */}
            {rankings.length > 2 && (
              <View className="items-center mx-2">
                <View className="w-16 h-16 rounded-full bg-orange-100 border-2 border-gray-200 justify-center items-center">
                  <Text className="text-xl font-interBold" style={{ color: THEME_COLORS.bronze }}>3</Text>
                </View>
                <MedalWithAnimation rank={3} size={30} />
                <Text className="font-interSemiBold text-sm mt-1" numberOfLines={1} style={{ maxWidth: 80 }}>
                  {rankings[2]?.name}
                </Text>
                <View className="bg-orange-100 px-2 py-1 rounded-full mt-1">
                  <Text className="font-interBold text-sm text-orange-700">
                    {rankings[2]?.score}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Danh sách xếp hạng */}
        <ScrollView 
          className="flex-1 mt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="bg-white rounded-t-3xl px-2 pt-4 pb-20">
            {rankings.map((item, index) => (
              <RankingItem key={item.id} item={item} index={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </HeaderLayout>
  );
}

export default RankScreen;