import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    clearCart,
    clearCartOnServer,
    fetchCart,
} from "../stores/shop/CartSlice";
import { createNewOrder } from "../stores/shop/OrderSlice";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user?.id]);

    const totalPrice =
        cartItems?.items?.reduce((sum, item) => {
            const price = item.salePrice ?? item.price;
            return sum + (price || 0) * item.quantity;
        }, 0) || 0;


    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin giao hàng.");
            return;
        }

        if (!cartItems?.items?.length) {
            Alert.alert("Lỗi", "Giỏ hàng của bạn đang trống.");
            return;
        }

        const orderData = {
            userId: user?.id,
            cartItems: cartItems.items.map((item) => ({
                productId: item._id,
                title: item.title,
                price: item.salePrice || item.price,
                quantity: item.quantity,
            })),
            addressInfo: {
                address: formData.address,
                phone: formData.phone,
                notes: "",
            },
            orderStatus: "pending",
            paymentMethod: "cod",
            paymentStatus: "unpaid",
            totalAmount: totalPrice,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: null,
            payerId: null,
            cartId: cartItems._id,
        };

        try {
            const resultAction = await dispatch(createNewOrder(orderData));
            if (createNewOrder.fulfilled.match(resultAction)) {
                // Xóa giỏ hàng khi đặt thành công
                // await dispatch(clearCartOnServer(user.id));
                // dispatch(clearCart());
                Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt thành công!");
                navigation.navigate("home");
                dispatch(fetchCart(user.id));
            } else {
                Alert.alert("Lỗi", "Đặt hàng không thành công, vui lòng thử lại.");
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi đặt hàng, vui lòng thử lại.");
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDetails}>
                Số lượng: {item.quantity} x {(item.salePrice || item.price || 0).toFixed(2)}$
            </Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Giỏ hàng của bạn</Text>
            <FlatList
                data={cartItems?.items || []}
                renderItem={renderCartItem}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
            />
            <Text style={styles.totalPrice}>
                Tổng cộng: {(totalPrice || 0).toFixed(2)}$
            </Text>


            <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>

            <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={formData.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => handleChange("phone", text)}
            />
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Địa chỉ giao hàng"
                multiline
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đặt hàng (COD)</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    cartItem: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    itemName: { fontSize: 16, fontWeight: "500" },
    itemDetails: { fontSize: 14, color: "#555" },
    totalPrice: { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default CheckoutScreen;
