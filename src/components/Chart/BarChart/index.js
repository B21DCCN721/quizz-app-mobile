import React from 'react';
import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const DailyAttemptsChart = ({ data }) => {
  const { width } = useWindowDimensions();
  const chartWidth = width * 0.9; // Chiếm 90% chiều rộng màn hình
  const chartHeight = chartWidth * 0.6; // Tỉ lệ 16:9

  // Chuẩn bị dữ liệu
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.count)
      }
    ]
  };

  return (
    <View style={[styles.container, { width: chartWidth }]}>
      <Text style={styles.title}>Số lượt làm bài trong 7 ngày gần nhất</Text>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        yAxisLabel=""
        yAxisSuffix=" lượt"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8
          },
          barPercentage: 0.5,
          propsForLabels: {
            fontSize: width < 400 ? 8 : 10 // Font nhỏ hơn trên màn hình nhỏ
          },
          propsForVerticalLabels: {
            fontSize: width < 400 ? 8 : 9
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 8
        }}
        verticalLabelRotation={width < 400 ? -45 : 0} // Xoay nhãn nếu màn hình nhỏ
        fromZero
        showBarTops
        withInnerLines={false}
        withHorizontalLabels={width > 350} // Ẩn nhãn ngang nếu màn hình quá nhỏ
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
});

export default DailyAttemptsChart;