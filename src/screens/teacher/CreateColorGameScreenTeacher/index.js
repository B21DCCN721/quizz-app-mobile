import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import * as ImagePicker from 'expo-image-picker';
import FileUpload from '../../../../assets/icons/fileUpload.svg';

function CreateColorGameScreenTeacher({ navigation, route }) {
    const { assignmentData } = route.params;
    const [image, setImage] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!image) {
            Alert.alert('Cảnh báo', 'Vui lòng chọn hình ảnh');
            return;
        }
        if (!correctAnswer) {
            Alert.alert('Cảnh báo', 'Vui lòng nhập đáp án đúng');
            return;
        }
        
        // Process and submit the data
        const gameData = {
            ...assignmentData,
            imageUri: image,
            correctAnswer: parseInt(correctAnswer)
        };
        
        navigation.navigate('Assignments');
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <HeaderLayout>
            <Text style={styles.header}>Tạo trò chơi đoán màu</Text>
            <Text style={styles.subHeader}>Bài: {assignmentData.name}</Text>
            <Text style={styles.label}>Chọn hình ảnh</Text>
            <Text style={{marginBottom: 16}}>Chọn ảnh có dung lượng tối đa 5mb</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.uploadContent}>
                        <FileUpload width={60} height={60} />
                        <Text style={styles.uploadText}>Tải lên hình ảnh</Text>
                    </View>
                )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Đáp án đúng</Text>
                <TextInput
                    style={styles.numberInput}
                    placeholder="Nhập đáp án đúng"
                    keyboardType="numeric"
                    value={correctAnswer}
                    onChangeText={setCorrectAnswer}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </HeaderLayout>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E7784C',
    },
    subHeader: {
        fontSize: 20,
        fontFamily: 'inter',
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
        color: '#333',
    },
    uploadContainer: {
        height: 300,
        borderWidth: 1,
        borderColor: '#2354E6',
        borderStyle: 'dashed',
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    uploadContent: {
        alignItems: 'center',
    },
    uploadText: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
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
    inputContainer: {
        marginBottom: 20,
    },
    numberInput: {
        height: 50,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f5f5f5',
    },
});

export default CreateColorGameScreenTeacher;
