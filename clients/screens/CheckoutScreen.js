import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CommonForm from '../components/common/Form';
import { fetchCart } from '../stores/shop/CartSlice';
// import { clearCart } from '../store/cart/cartSlice'; // Giả sử bạn có slice giỏ hàng
// import { placeOrder } from '../store/orders/orderSlice'; // Giả sử bạn có slice đơn hàng

const shippingFormControls = [
    {
        name: 'fullName',
        label: 'Họ và tên',
        placeholder: 'Nhập họ và tên',
        componentType: 'input',
    },
    {
        name: 'phone',
        label: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
        componentType: 'input',
    },
    {
        name: 'address',
        label: 'Địa chỉ giao hàng',
        placeholder: 'Nhập địa chỉ',
        componentType: 'textarea',
    },
];

const CheckoutScreen = () => {
    const { cartItems } = useSelector(state => state.shopCart);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart(user?.id));
    }, [dispatch, user?.id]);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
    });

    const totalPrice = cartItems?.items?.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
    );



    const handleSubmit = () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin giao hàng.');
            return;
        }

        // const orderData = {
        //     items: cartItems,
        //     shippingInfo: formData,
        //     total: totalPrice,
        // };

        // dispatch(placeOrder(orderData));
        // dispatch(clearCart());
        Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt thành công!');
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDetails}>
                Số lượng: {item.quantity} x {item.salePrice || item.price}$
            </Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Giỏ hàng của bạn</Text>
            <FlatList
                data={cartItems?.items}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={renderCartItem}
                style={styles.cartList}
            />

            <Text style={styles.totalPrice}>Tổng cộng: {totalPrice}$</Text>

            <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
            <CommonForm
                formControls={shippingFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="Đặt hàng"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    cartList: {
        marginBottom: 16,
    },
    cartItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDetails: {
        fontSize: 14,
        color: '#555',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
    },
});

export default CheckoutScreen;
