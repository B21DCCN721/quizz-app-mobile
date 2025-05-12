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

function EditColorGameScreenTeacher({ navigation, route }) {
    const { assignment } = route.params;
    const { id, name, des, type, grade } = assignment;
    console.log("assignment", assignment);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState(
        Array(10)
            .fill()
            .map(() => ({
                question: "",
                image: null,
                correct_position: "",
            }))
    );

    useEffect(() => {
        const fetchExerciseDetail = async () => {
            try {
                const res = await axiosClient.get(`/api/exercises/${id}?type=${type}`);
                if (res.data.code === 1) {
                    console.log('Exercise detail:', res.data);

                    const rawQuestions = res.data.exercise.ColorQuestions || [];

                    console.log("rawQuestions", rawQuestions);

                    const mappedQuestions = rawQuestions.map((q) => ({
                        question: q.question_text || "",
                        image: q.image_url || null,
                        correct_position: q.ColorAnswers[0].correct_position || "",
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
                                    correct_position: "",
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

    console.log("question", questions);

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
        updatedQuestions[currentPage - 1].question = text;
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentPage - 1].correct_position = text;
        setQuestions(updatedQuestions);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSave = async () => {
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.image) {
                Alert.alert("Cảnh báo", `Vui lòng chọn hình ảnh cho câu hỏi ${i + 1}`);
                return;
            }
            if (!q.question || !q.correct_position) {
                Alert.alert("Cảnh báo", `Vui lòng điền đầy đủ thông tin cho câu hỏi ${i + 1}`);
                return;
            }
        }

        try {
            setIsLoading(true);
            const formData = new FormData();

            questions.forEach((q, index) => {
                const uriParts = q.image.split(".");
                const fileType = uriParts[uriParts.length - 1];

                formData.append("images", {
                    uri: q.image,
                    name: `color_question_${index + 1}.${fileType}`,
                    type: `image/${fileType}`,
                });
            });

            const data = {
                title: name,
                description: des || "",
                grade: grade || 1,
                questions: questions.map((q) => ({
                    question_text: q.question,
                    correct_position: parseInt(q.correct_position),
                })),
            };

            formData.append("data", JSON.stringify(data));

            const response = await axiosClient.put(
                "/api/teacher/exercises/update/color/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Alert.alert("Thành công", response.data.message);
            navigation.navigate("Assignments", { refresh: true });
        } catch (error) {
            console.error("Tạo bài tập sắc màu thất bại:", error?.response?.data?.message);
            Alert.alert("Lỗi", error?.response?.data?.message || "Tạo bài tập thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <HeaderLayout>
            <ScrollView>
                <Text style={styles.header}>Thêm câu hỏi - Câu ({currentPage}/10)</Text>
                <Text style={styles.subHeader}>Bài: {name}</Text>
                <Text style={styles.label}>Chọn hình ảnh</Text>
                <TouchableOpacity
                    style={styles.uploadContainer}
                    onPress={pickImage}
                    disabled={isLoading}
                >
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
                        style={styles.input}
                        placeholder="Nhập câu hỏi"
                        value={questions[currentPage - 1].question}
                        onChangeText={handleQuestionChange}
                        editable={!isLoading}
                    />
                    <Text style={styles.label}>Vị trí đúng</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập vị trí chính xác (số)"
                        keyboardType="numeric"
                        value={questions[currentPage - 1].correct_position}
                        onChangeText={handleAnswerChange}
                        editable={!isLoading}
                    />
                </View>

                <PaginationTestTeacher currentScreen={currentPage} onChangeScreen={handlePageChange} />

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
                            if (!currentQ.image || !currentQ.question || !currentQ.correct_position) {
                                Alert.alert("Cảnh báo", "Vui lòng nhập đầy đủ dữ liệu trước khi tiếp tục");
                                return;
                            }
                            if (currentQ.correct_position < 1 || currentQ.correct_position > 9) {
                                Alert.alert("Cảnh báo", "Vị trí chính xác phải từ 1 đến 9");
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
    },
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

export default EditColorGameScreenTeacher;
