import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import HeaderLayout from "../../../layouts/HeaderLayout";
import * as ImagePicker from "expo-image-picker";
import FileUpload from "../../../../assets/icons/fileUpload.svg";
import PaginationTestTeacher from "../../../components/Pagination/PaginationTestTeacher";
import axiosClient from "../../../configs/axiosClient";

function EditNumberGameScreenTeacher({ navigation, route }) {
    const { assignment } = route.params;
    const { id, name, des, type, grade } = assignment;
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
    const [questions, setQuestions] = useState(
        Array(10)
            .fill()
            .map(() => ({
                question: "",
                image: null,
                item: { name: "", quantity: "" },
            }))
    );

    useEffect(() => {
        const fetchExerciseDetail = async () => {
            try {
                const res = await axiosClient.get(`/api/exercises/${id}?type=${type}`);
                if (res.data.code === 1) {
                    console.log('Exercise detail:', res.data);

                    const rawQuestions = res.data.exercise.CountingQuestions || [];
                    
                    console.log("rawQuestions", rawQuestions);

                    const mappedQuestions = rawQuestions.map((q) => ({
                        question: q.question_text || "",
                        image: q.image_url || null,
                        item: {
                            name: q.CountingAnswers[0].object_name,
                            quantity: q.CountingAnswers[0].correct_count?.toString(),
                        },
                    }));

                    // Đảm bảo có đủ 10 câu hỏi
                    setQuestions(
                        mappedQuestions.length === 10
                            ? mappedQuestions
                            : [
                                ...mappedQuestions,
                                ...Array(10 - mappedQuestions.length).fill({
                                    question: "",
                                    image: null,
                                    item: { name: "", quantity: "" },
                                }),
                            ]
                    );
                } else {
                    Alert.alert("Lỗi", "Không lấy được dữ liệu bài tập");
                }
            } catch (error) {
                console.error("Lỗi khi fetch bài tập:", error);
                Alert.alert("Lỗi", "Không thể tải bài tập");
            }
        };

        fetchExerciseDetail();
    }, [id]);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const updatedQuestions = [...questions];
            updatedQuestions[currentPage - 1].image = result.assets[0].uri;
            setQuestions(updatedQuestions);
        }
    };

    const handleQuestionChange = (text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentPage - 1] = {
            ...updatedQuestions[currentPage - 1],
            question: text,
        };
        setQuestions(updatedQuestions);
    };

    const handleItemChange = (field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentPage - 1].item = {
            ...updatedQuestions[currentPage - 1].item,
            [field]: value,
        };
        setQuestions(updatedQuestions);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSave = async () => {
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].image) {
                Alert.alert("Cảnh báo", `Vui lòng chọn hình ảnh cho câu hỏi ${i + 1}`);
                return;
            }
            if (!questions[i].item.name || !questions[i].item.quantity) {
                Alert.alert(
                    "Cảnh báo",
                    `Vui lòng điền đầy đủ thông tin cho câu hỏi ${i + 1}`
                );
                return;
            }
        }

        try {
            setIsLoading(true); // ✅ Bắt đầu loading
            const formData = new FormData();

            // Đính kèm ảnh
            questions.forEach((q, index) => {
                const uriParts = q.image.split(".");
                const fileType = uriParts[uriParts.length - 1];

                formData.append("images", {
                    uri: q.image,
                    name: `question_${index + 1}.${fileType}`,
                    type: `image/${fileType}`,
                });
            });

            const data = {
                title: name,
                description: des || "",
                grade: grade || 1,
                questions: questions.map((q) => ({
                    question_text: q.question,
                    object_name: q.item.name,
                    correct_count: parseInt(q.item.quantity),
                })),
            };

            formData.append("data", JSON.stringify(data));

            const response = await axiosClient.put(
                "/api/teacher/exercises/update/counting/" + id,
                formData,
                {
                    headers: {
                        "content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.code === 1) {
                Alert.alert('Thành công', 'Đã cập nhật bài tập');
                navigation.navigate('Assignments', { refresh: true });
            } else {
                Alert.alert('Thất bại', response.data.message || 'Không thể cập nhật bài tập');
            }
        } catch (error) {
            console.error('Lỗi cập nhật bài tập:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu bài tập');
        } finally {
            setIsLoading(false); // ✅ Kết thúc loading 
        }
    };

    return (
        <HeaderLayout>
            <ScrollView>
            <Text style={styles.header}>Thêm câu hỏi - Câu ({currentPage}/10)</Text>
            <Text style={styles.subHeader}>Bài: {name}</Text>
            <Text style={styles.label}>Chọn hình ảnh</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage} disabled={isLoading}>
                {questions[currentPage - 1].image ? (
                    <Image
                        source={{ uri: questions[currentPage - 1].image }}
                        style={styles.image}
                    />
                ) : (
                    <View style={styles.uploadContent}>
                        <FileUpload width={60} height={60} />
                        <Text style={styles.uploadText}>Tải lên hình ảnh</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.answersContainer}>
                <Text style={styles.label}>Câu hỏi</Text>
                <TextInput
                    style={[styles.itemInput, styles.nameInput]}
                    placeholder="Nhập câu hỏi"
                    value={questions[currentPage - 1].question}
                    onChangeText={handleQuestionChange}
                    editable={!isLoading}
                />
                <Text style={styles.label}>Thông tin vật phẩm</Text>
                <TextInput
                    style={[styles.itemInput, styles.nameInput]}
                    placeholder="Tên vật phẩm"
                    value={questions[currentPage - 1].item.name}
                    onChangeText={(text) => handleItemChange("name", text)}
                    editable={!isLoading}
                />
                <TextInput
                    style={[styles.itemInput, styles.quantityInput]}
                    placeholder="Số lượng"
                    keyboardType="numeric"
                    value={questions[currentPage - 1].item.quantity}
                    onChangeText={(text) => handleItemChange("quantity", text)}
                    editable={!isLoading}
                />
            </View>

            <PaginationTestTeacher
                currentScreen={currentPage}
                onChangeScreen={handlePageChange}
            />

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={{ marginTop: 10 }}>Đang lưu bài tập...</Text>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => {
                        if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                        } else {
                            navigation.goBack();
                        }
                    }}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>Trở về</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() => {
                        const currentQ = questions[currentPage - 1];
                        if (
                            !currentQ.image ||
                            !currentQ.item.name ||
                            !currentQ.item.quantity
                        ) {
                            Alert.alert(
                                "Cảnh báo",
                                "Vui lòng nhập đầy đủ dữ liệu trước khi tiếp tục"
                            );
                            return;
                        }
                        if (currentPage < 10) {
                            handlePageChange(currentPage + 1);
                        } else {
                            handleSave();
                        }
                    }}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {currentPage === 10 ? "Lưu bài tập" : "Câu tiếp theo"}
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </HeaderLayout>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
    subHeader: { fontSize: 16, marginBottom: 16 },
    label: { fontWeight: "bold", marginBottom: 6 },
    uploadContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 240,
    },
    uploadContent: {
        alignItems: "center",
    },
    uploadText: {
        marginTop: 10,
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    answersContainer: {
        marginBottom: 20,
    },
    itemInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
    },
    nameInput: {},
    quantityInput: {},
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    cancelButton: {
        backgroundColor: "#ccc",
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    loadingContainer: {
        alignItems: "center",
        marginTop: 20,
    },
});

export default EditNumberGameScreenTeacher;
