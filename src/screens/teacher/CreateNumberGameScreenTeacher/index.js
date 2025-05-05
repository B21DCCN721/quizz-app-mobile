import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import * as ImagePicker from 'expo-image-picker';
import FileUpload from '../../../../assets/icons/fileUpload.svg';
import TrashIcon from '../../../../assets/icons/trash.svg';

function CreateNumberGameScreenTeacher({ navigation, route }) {
    const { assignmentData } = route.params;
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([{ id: 1, name: '', quantity: '' }]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAddItem = () => {
        setItems([...items, { id: items.length + 1, name: '', quantity: '' }]);
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleDeleteItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        } else {
            Alert.alert('Cảnh báo', 'Phải có ít nhất một đáp án');
        }
    };

    const handleSubmit = () => {
        if (!image) {
            Alert.alert('Cảnh báo', 'Vui lòng chọn hình ảnh');
            return;
        }
        
        const hasEmptyFields = items.some(item => !item.name || !item.quantity);
        if (hasEmptyFields) {
            Alert.alert('Cảnh báo', 'Vui lòng điền đầy đủ thông tin cho tất cả các mục');
            return;
        }
        
        // Process and submit the data
        const gameData = {
            ...assignmentData,
            imageUri: image,
            items: items.map(item => ({
                name: item.name,
                quantity: parseInt(item.quantity)
            }))
        };
        
        navigation.navigate('Assignments');
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <HeaderLayout>
            <Text style={styles.header}>Tạo trò chơi đếm số</Text>
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
            <View style={styles.answersContainer}>
                <Text style={styles.label}>Danh sách đáp án</Text>
                <ScrollView style={styles.scrollView}>
                    {items.map((item, index) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <Text style={styles.itemIndex}>{index + 1}.</Text>
                            <TextInput
                                style={[styles.itemInput, styles.nameInput]}
                                placeholder="Tên vật phẩm"
                                value={item.name}
                                onChangeText={(text) => handleItemChange(item.id, 'name', text)}
                            />
                            <TextInput
                                style={[styles.itemInput, styles.quantityInput]}
                                placeholder="Số lượng"
                                keyboardType="numeric"
                                value={item.quantity}
                                onChangeText={(text) => handleItemChange(item.id, 'quantity', text)}
                            />
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => handleDeleteItem(item.id)}
                            >
                                <TrashIcon width={24} height={24} fill="#FF3B30" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={handleAddItem}
                >
                    <Text style={styles.addButtonText}>+ Thêm đáp án</Text>
                </TouchableOpacity>
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
        height: 200,
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
    answersContainer: {
        marginBottom: 20,
    },
    scrollView: {
        maxHeight: 160,
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemIndex: {
        width: 30,
        fontSize: 20,
        color: '#333',
    },
    itemInput: {
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    nameInput: {
        flex: 2,
        marginRight: 10,
    },
    quantityInput: {
        flex: 1,
    },
    addButton: {
        padding: 10,
        backgroundColor: '#2354E6',
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CreateNumberGameScreenTeacher;
