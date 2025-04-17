import React, { useState } from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import ArrowRight from "../../../assets/icons/arrowRight.svg";
import PaginationTest from "../../components/Pagination/PaginationTest";
const HistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Trắc nghiệm");
  const [currentPage, setCurrentPage] = useState(1);
  const totalScreen = 10;

  const tabs = ["Trắc nghiệm", "Tô màu", "Đếm số"];
  const data = Array(6).fill({ name: "abc", score: 96 });

  return (
    <HeaderLayout>
      <View style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.header}>Lịch sử làm bài</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tiêu đề của bảng  */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.headerName]}>Tên bài thi</Text>
          <Text style={[styles.headerText, styles.headerScore]}>Điểm</Text>
          <Text style={[styles.headerText, styles.headerRetry]}>Làm lại</Text>
        </View>

        {/* Danh sách */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={[styles.cell, styles.cellName]}>
                <Text style={styles.examName}>{item.name}</Text>
              </View>
              <View style={[styles.cell, styles.cellScore]}>
                <Text style={styles.score}>{item.score}</Text>
              </View>
              <View style={[styles.cell, styles.cellRetry]}>
                <TouchableOpacity onPress={() => navigation.navigate("HistoryResult")}>
                  <ArrowRight width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Phân trang */}
        <PaginationTest totalScreen={totalScreen} onChangeScreen={setCurrentPage} />
      </View>
    </HeaderLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: "#ff4d4d",
    backgroundColor: "#ffebeb",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#ff4d4d",
    fontWeight: "bold",
  },

  /* Tiêu đề của bảng  */
  headerRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  headerName: {
    flex: 2,
    textAlign: "left",
    paddingLeft: 10,
  },
  headerScore: {
    flex: 1,
    textAlign: "center",
    paddingLeft: 70,
  },
  headerRetry: {
    flex: 1,
    textAlign: "center",
  },

  /* Dòng dữ liệu */
row: {
  flexDirection: "row",
  marginBottom: 10,
},
cell: {
  backgroundColor: "#b2f0f0",
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 10, 
  borderRadius: 10,
  elevation: 4,
},
  cellName: {
    flex: 2,
  },
  cellScore: {
    flex: 0.3,
  },
  cellRetry: {
    flex: 0.3,
  },

  /* Nội dung ô */
  examName: {
    fontSize: 16,
    fontWeight: "600",
  },
  score: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default HistoryScreen;
