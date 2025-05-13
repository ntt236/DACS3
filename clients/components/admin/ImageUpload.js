import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const ProductImageUpload = ({
    imageFile,
    setImageFile,
    upLoadImageUrl,
    setUpLoadImageUrl,
    imageLoading,
    setImageLoading,
}) => {
    const pickImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                setImageFile(result.assets[0]);

            }
        } catch (error) {
            console.error("Error picking image:", error);
            alert("Lỗi khi chọn ảnh: " + error.message);
        }
    };

    const uploadImageToCloudinary = async () => {
        if (!imageFile) return;

        setImageLoading(true);

        const formData = new FormData();
        formData.append("my_file", {
            uri: imageFile.uri,
            name: imageFile.name || `image_${Date.now()}.jpg`,
            type: imageFile.mimeType || "image/jpeg",
        });

        try {
            const response = await axios.post(
                "http://10.0.2.2:5000/api/admin/products/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data?.success) {
                setUpLoadImageUrl(response.data.result.url);
            } else {
                console.error("Upload failed: No success response");
                alert("Tải ảnh lên thất bại. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Upload failed:", err.response?.data || err.message);
            alert("Lỗi khi tải ảnh lên: " + (err.response?.data?.message || err.message));
        } finally {
            setImageLoading(false);
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tải ảnh sản phẩm</Text>

            {upLoadImageUrl && !imageLoading && (
                <Image
                    source={{ uri: upLoadImageUrl }}
                    style={styles.previewImage}
                    resizeMode="contain"
                />
            )}

            <TouchableOpacity
                style={styles.uploadBox}
                onPress={pickImage}
            >
                {imageFile && !imageLoading ? (

                    < Text style={styles.fileName}>{imageFile.name}</Text>
                ) : imageLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <Text style={styles.uploadText}>Nhấn để tải ảnh lên</Text>
                )}
            </TouchableOpacity>

            {/* {
                upLoadImageUrl && (
                    <Text style={styles.uploadedText}>Ảnh đã tải lên: {upLoadImageUrl}</Text>
                )
            } */}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: "100%",
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
    },
    uploadBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    uploadText: {
        color: "#888",
    },
    fileName: {
        fontWeight: "bold",
    },
    uploadedText: {
        marginTop: 8,
        color: "green",
        fontSize: 12,
    },
    previewImage: {
        width: "100%",
        height: 150,
        marginBottom: 10,
        borderRadius: 8,
    },
});

export default ProductImageUpload;