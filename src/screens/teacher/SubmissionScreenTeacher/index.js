import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import { MaterialIcons } from '@expo/vector-icons';

function SubmissionScreenTeacher({ route, navigation }) {
  const { formattedSubmissions } = route.params;
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [loading, setLoading] = useState(false);

// Filter submissions by search text (name or ID), date, and score range
const filteredSubmissions = formattedSubmissions.filter(s => {
  // Kiểm tra nếu submission không tồn tại
  if (!s) return false;
  
  // Chuẩn hóa search text thành chữ thường
  const searchLower = searchText.toLowerCase();
  
  // Tìm kiếm theo cả tên và ID
  const matchesSearch = 
    (s.name || '').toLowerCase().includes(searchLower) || // Tìm theo tên
    (s.id && s.id.toString().includes(searchText)); // Tìm theo ID (chuyển sang string để so sánh)
  
  // Lọc theo ngày
  const matchesDate = selectedDate ? s.submitTime === selectedDate : true;
  
  // Lọc theo điểm số
  const score = Number(s.score);
  const min = minScore === '' ? Number.NEGATIVE_INFINITY : Number(minScore);
  const max = maxScore === '' ? Number.POSITIVE_INFINITY : Number(maxScore);
  const matchesScore = score >= min && score <= max;
  
  return matchesSearch && matchesDate && matchesScore;
});

  const renderSubmissionItem = (item) => (
    <View key={item.id} style={styles.submissionRow}>
      <View style={styles.submissionCell}>
        <Text style={styles.submissionText}>{item.id}</Text>
      </View>
      <View style={styles.submissionCell}>
        <Text style={styles.submissionText}>{item.name}</Text>
      </View>
      <View style={styles.submissionCell}>
        <Text style={styles.submissionText}>{item.submitTime}</Text>
      </View>
      <View style={styles.submissionCell}>
        <Text style={styles.submissionText}>{item.score}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SubmissionDetailScreen', { item })}
        style={styles.viewButton}
        accessibilityLabel="View submission"
      >
        <Text style={styles.viewButtonText}>Chi Tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <HeaderLayout>
      <Text style={styles.header}>Danh sách nộp bài</Text>
      {/* Search bar and filter icon */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterIcon} onPress={() => setShowFilterModal(true)}>
          <MaterialIcons name="filter-list" size={24} color="#E7784C" />
        </TouchableOpacity>
      </View>
      {/* Current filters display */}
      <Text style={{ paddingHorizontal: 12, fontFamily: 'inter', fontSize: 16, fontWeight: 'bold' }}>Bộ lọc</Text>
      <View style={styles.currentFilters}>
        <Text style={styles.filterText}>
          Ngày nộp: {selectedDate || 'Tất cả'}    |    Điểm: {minScore || '0'} - {maxScore || '∞'}
        </Text>
      </View>
      {/* Filter modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bộ lọc</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialIcons name="close" size={24} color="#E7784C" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Ngày nộp (YYYY-MM-DD)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Ví dụ: 2023-06-01"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                />
              </View>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Khoảng điểm</Text>
                <View style={styles.scoreRangeContainer}>
                  <TextInput
                    style={[styles.modalInput, styles.scoreInput]}
                    placeholder="Min"
                    keyboardType="numeric"
                    value={minScore}
                    onChangeText={setMinScore}
                  />
                  <Text style={styles.scoreRangeSeparator}>-</Text>
                  <TextInput
                    style={[styles.modalInput, styles.scoreInput]}
                    placeholder="Max"
                    keyboardType="numeric"
                    value={maxScore}
                    onChangeText={setMaxScore}
                  />
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Submission list with header and scroll */}
      <View style={styles.submissionHeader}>
        <View style={styles.headerCell}><Text style={styles.headerText}>ID</Text></View>
        <View style={styles.headerCell}><Text style={styles.headerText}>Tên</Text></View>
        <View style={styles.headerCell}><Text style={styles.headerText}>Ngày nộp</Text></View>
        <View style={styles.headerCell}><Text style={styles.headerText}>Điểm số</Text></View>
        <View style={styles.headerCell}><Text style={styles.headerText}>Thao tác</Text></View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fbbf24" />
      ) : filteredSubmissions.length === 0 ? (
        <Text style={styles.emptyText}>Không có bài nộp tương ứng</Text>
      ) : (
        <ScrollView style={styles.submissionsScroll}>
          {filteredSubmissions.map(renderSubmissionItem)}
        </ScrollView>
      )}
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E7784C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterIcon: {
    marginLeft: 10,
    padding: 8,
  },
  currentFilters: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E7784C',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E7784C',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  scoreRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreInput: {
    flex: 1,
  },
  scoreRangeSeparator: {
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#E7784C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submissionHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffe8b3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400e',
  },
  submissionsScroll: {
    maxHeight: 400,
  },
  submissionRow: {
    flexDirection: 'row',
    backgroundColor: '#fff8dc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  submissionCell: {
    flex: 1,
    alignItems: 'center',
  },
  submissionText: {
    fontSize: 14,
    color: '#92400e',
  },
  viewButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    color: '#92400e',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SubmissionScreenTeacher;
