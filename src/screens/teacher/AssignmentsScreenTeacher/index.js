import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { AssignmentCard } from '../../../components/Card';
import axiosClient from "../../../configs/axiosClient";
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AssignmentsScreenTeacher({ navigation }) {
    const user = useSelector((state) => state.auth.user);
    const userId = user.id;
    const [searchText, setSearchText] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(null); // null = tất cả
    const [selectedType, setSelectedType] = useState(null);    
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [assignments, setAssignments] = useState([]);

    const grades = [
        { label: 'Tất cả', value: null },
        { label: 'Lớp 1', value: 1 },
        { label: 'Lớp 2', value: 2 },
        { label: 'Lớp 3', value: 3 },
        { label: 'Lớp 4', value: 4 },
        { label: 'Lớp 5', value: 5 },
      ];
      
      const types = [
        { label: 'Tất cả', value: null },
        { label: 'Câu hỏi trắc nghiệm', value: 1 },
        { label: 'Trò chơi đếm số', value: 2 },
        { label: 'Trò chơi đoán màu', value: 3 },
      ];
      
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosClient.get('/api/exercises');
                const data = Array.isArray(response.data.exercises) ? response.data.exercises : [];
                const filteredData = data.filter(assignment => assignment.User.id === userId);
                setAssignments(filteredData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài tập:', error);
                setAssignments([]);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            fetchAssignments(); // Gọi lại API mỗi khi màn hình được focus
          });

        fetchAssignments();
    }, []);

    console.log("Assignments:", assignments);

    const filteredAssignments = assignments.filter(a =>
        (a.title || '').toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedGrade === null || a.grade === selectedGrade) &&
        (selectedType === null || a.exercise_type === selectedType)
    );

    return (
        <DefaultLayout>
            <Text style={styles.header}>Bài tập của tôi</Text>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity
                    style={styles.filterIcon}
                    onPress={() => setShowFilterModal(true)}
                >
                    <MaterialIcons name="filter-list" size={24} color="#E7784C" />
                </TouchableOpacity>
            </View>
            <Text style={{ paddingHorizontal: 12, fontFamily: 'inter', fontSize: 16, fontWeight: 'bold' }}>Bộ lọc</Text>
            <View style={styles.currentFilters}>
                <Text style={styles.filterText}>
                Lớp: {grades.find(g => g.value === selectedGrade)?.label || 'Tất cả'}    |    Loại: {types.find(t => t.value === selectedType)?.label || 'Tất cả'}
                </Text>
            </View>
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
                                <Text style={styles.filterLabel}>Lớp học</Text>
                                {grades.map(g => (
                                    <TouchableOpacity
                                        key={g.label}
                                        style={[styles.modalFilterButton, selectedGrade === g.value && styles.modalFilterButtonActive]}
                                        onPress={() => setSelectedGrade(g.value)}
                                    >
                                        <Text style={[styles.modalFilterButtonText, selectedGrade === g.value && styles.modalFilterButtonTextActive]}>
                                        {g.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Loại bài tập</Text>
                                {types.map(t => (
                                    <TouchableOpacity
                                        key={t.label}
                                        style={[styles.modalFilterButton, selectedType === t.value && styles.modalFilterButtonActive]}
                                        onPress={() => setSelectedType(t.value)}
                                    >
                                    <Text style={[styles.modalFilterButtonText, selectedType === t.value && styles.modalFilterButtonTextActive]}>
                                        {t.label}
                                    </Text>
                                    </TouchableOpacity>
                                ))}
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
            <ScrollView style={styles.assignmentsList}>
                {filteredAssignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onPress={() => navigation.navigate('AssignmentOverview', { assignment })}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('CreateAssignment') }}>
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
        </DefaultLayout>
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
    modalFilterButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        marginBottom: 8,
    },
    modalFilterButtonActive: {
        backgroundColor: '#E7784C',
    },
    modalFilterButtonText: {
        color: '#333',
    },
    modalFilterButtonTextActive: {
        color: 'white',
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
    assignmentsList: {
        paddingHorizontal: 12,
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E7784C',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
});

export default AssignmentsScreenTeacher;
