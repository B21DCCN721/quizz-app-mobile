import React, { useState } from 'react';
import {Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import RNPickerSelect from 'react-native-picker-select';

function CreateAssignmentScreenTeacher({ navigation }) {
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDes, setassignmentDes] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);

    const types = [
        { label: 'Câu hỏi trắc nghiệm', value: 1},
        { label: 'Trò chơi đoán màu', value: 3},
        { label: 'Trò chơi đếm số', value: 2 },
    ];

    const grades = [
        { label: 'Lớp 1', value: 1 },
        { label: 'Lớp 2', value: 2 },
        { label: 'Lớp 3', value: 3 },
        { label: 'Lớp 4', value: 4 },
        { label: 'Lớp 5', value: 5 },
    ];

    const handleNext = () => {
        if (!assignmentName) {
            Alert.alert('Cảnh báo','Tên bài tập không được để trống');
            return;
        }

        if (!selectedType) {
            Alert.alert('Cảnh báo','Bạn chưa chọn loại bài tập');
            return;
        }
        
        if (!selectedGrade) {
            Alert.alert('Cảnh báo','Bạn chưa chọn lớp');
            return;
        }

        const assignmentData = {
            name: assignmentName,
            description: assignmentDes,
            type: selectedType,
            grade: selectedGrade,
        };

        switch(selectedType) {
            case 1:
                navigation.navigate('CreateQuiz', { assignmentData });
                break;
            case 3:
                navigation.navigate('CreateColorGame', { assignmentData });
                break;
            case 2:
                navigation.navigate('CreateNumberGame', { assignmentData });
                break;
        }
    };

    const handleCancel = () => {
        // Logic to cancel the password change
        navigation.goBack();
    }

    return (
        <HeaderLayout>
            <Text style={styles.header}>Tạo bài tập mới</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên bài</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên bài tập"
                    value={assignmentName}
                    onChangeText={setAssignmentName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Giới thiệu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mô tả bài tập"
                    value={assignmentDes}
                    onChangeText={setassignmentDes}
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Loại bài tập</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedType(value)}
                    items={types}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Chọn loại bài tập', value: null }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Lớp</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedGrade(value)}
                    items={grades}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Chọn lớp', value: null }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleNext}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 60,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        fontFamily: 'Inter-SemiBold',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        width: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#a6a4a4',
    },
    saveButton: {
        backgroundColor: '#E7784C',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold', 
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
        color: 'black',
    },
    inputAndroid: {
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
        color: 'black',
    },
});

export default CreateAssignmentScreenTeacher;
