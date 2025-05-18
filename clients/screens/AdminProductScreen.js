import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../components/common/Form";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "../stores/admin/AdminSlice";
import AdminProductTile from "../components/admin/ProductTile";
import ProductImageUpload from "../components/admin/ImageUpload"
import Footer from "../components/Layouts/Footer";
import { addProductFormElements } from "../config";
import FooterAdmin from "../components/Layouts/FooterAdmin";

const initialFormData = {
    image: "",
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    totalStock: "",
    salePrice: "",
};

const AdminProducts = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);

    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    // Đồng bộ uploadImageUrl với formData.image
    useEffect(() => {
        if (uploadImageUrl) {
            setFormData((prev) => ({
                ...prev,
                image: uploadImageUrl,
            }));
        }
    }, [uploadImageUrl]);

    // Hàm để đặt formData khi chỉnh sửa sản phẩm
    const setEditFormData = (product) => {
        setFormData({
            image: product.image || "",
            title: product.title || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            brand: product.brand || "",
            category: product.category || "",
            totalStock: product.totalStock?.toString() || "",
            salePrice: product.salePrice?.toString() || "",
        });
        setUploadImageUrl(product.image || "");
        setImageFile(null);
        setCurrentEditId(product._id);
        setModalVisible(true);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setImageFile(null);
        setUploadImageUrl("");
        setImageLoading(false);
        setCurrentEditId(null);
        setModalVisible(false);
    };

    const onSubmit = () => {
        if (imageLoading) {
            alert("Ảnh đang được tải lên. Vui lòng đợi.");
            return;
        }

        if (!formData.image && !currentEditId) {
            alert("Vui lòng chọn và tải lên ảnh sản phẩm.");
            return;
        }

        console.log("Form Data before submit:", formData);
        const payload = { ...formData };

        if (currentEditId) {
            dispatch(editProduct({ id: currentEditId, formData: payload })).then((res) => {
                if (res?.payload?.success) {
                    dispatch(fetchAllProduct());
                    resetForm();
                } else {
                    alert("Chỉnh sửa sản phẩm thất bại: " + (res?.payload?.message || "Lỗi không xác định"));
                }
            });
        } else {
            dispatch(addNewProduct(payload)).then((res) => {
                if (res?.payload?.success) {
                    dispatch(fetchAllProduct());
                    resetForm();
                } else {
                    alert("Thêm sản phẩm thất bại: " + (res?.payload?.message || "Lỗi không xác định"));
                }
            });
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id)).then((res) => {
            if (res?.payload?.success) {
                dispatch(fetchAllProduct());
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Thêm sản phẩm mới</Text>
            </TouchableOpacity>

            <FlatList
                data={productList}

                keyExtractor={(item) => item._id}
                numColumns={2}
                renderItem={({ item }) => (
                    <AdminProductTile
                        productList={item}
                        setFormData={setEditFormData} // Sử dụng hàm mới để đặt dữ liệu
                        setOpenProduct={setModalVisible}
                        setCurrentEditId={setCurrentEditId}
                        handleDelete={handleDelete}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            {/* <FlatList
                data={productList}
                keyExtractor={(item) => item._id}
                numColumns={2} // ✅ thêm dòng này
                renderItem={({ item }) => (
                    <AdminProductTile
                        productList={item}
                        setFormData={setEditFormData}
                        setOpenProduct={setModalVisible}
                        setCurrentEditId={setCurrentEditId}
                        handleDelete={handleDelete}
                    />
                )}
                columnWrapperStyle={{ justifyContent: "space-between" }} // ✅ căn đều 2 cột
                contentContainerStyle={{ paddingBottom: 80 }}
            /> */}

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent
                onRequestClose={resetForm}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                            <Text style={styles.modalTitle}>
                                {currentEditId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                            </Text>

                            <ProductImageUpload
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                upLoadImageUrl={uploadImageUrl}
                                setUpLoadImageUrl={setUploadImageUrl}
                                imageLoading={imageLoading}
                                setImageLoading={setImageLoading}
                                isEditMode={false} // Cho phép tải ảnh trong cả chế độ chỉnh sửa
                            />

                            <CommonForm
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                buttonText={currentEditId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                            />

                            <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                                <Text style={styles.cancelText}>Hủy</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <FooterAdmin />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 40,
    },
    addButton: {
        backgroundColor: "#00C853",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "center",
        marginBottom: 16,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        maxHeight: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    cancelButton: {
        marginTop: 20,
        alignItems: "center",
    },
    cancelText: {
        color: "red",
        fontSize: 16,
    },
});

export default AdminProducts;