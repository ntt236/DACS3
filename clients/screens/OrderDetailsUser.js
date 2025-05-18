import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrdersByUserId, getOrderDetails, } from '../stores/shop/OrderSlice';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Layouts/Footer';

const OrderDetailsUser = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { orderList } = useSelector(state => state.order);
    console.log("🚀 ~ OrderDetailsUser ~ orderList:", orderList)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user?.id) {
            dispatch(getAllOrdersByUserId(user?.id));
        }
    }, [dispatch, user]);

    // const handleViewDetails = (orderId) => {
    //     dispatch(getOrderDetails(orderId));
    //     navigation.navigate("OrderDetailScreen", { orderId });
    // };

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderId}>Mã đơn: {item._id}</Text>
            <Text>Ngày: {item?.orderDate?.split("T")[0]}</Text>

            <Text >
                Trạng thái:  <Text style={styles.badge(item.orderStatus)}>{item.orderStatus}</Text>
            </Text>
            <Text style={styles.amount}>Tổng tiền: {item.totalAmount.toFixed(0)}$</Text>
            <TouchableOpacity style={styles.detailBtn} >
                <Text style={styles.detailText}>Xem chi tiết</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lịch sử đơn hàng</Text>
            <FlatList
                data={orderList}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Footer />
        </View>
    );
};

export default OrderDetailsUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderItem: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    orderId: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    amount: {
        fontWeight: '600',
        marginTop: 6,
    },
    badge: (status) => ({
        marginTop: 4,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        color: '#fff',
        backgroundColor:
            status === 'confirmed' ? 'green' :
                status === 'rejected' ? 'red' : 'gray'
    }),
    detailBtn: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    detailText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
