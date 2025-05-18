import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FooterAdmin from '../components/Layouts/FooterAdmin';
import { getAllOrdersForAdmin, updateOrderStatus } from '../stores/admin/OrderSlice';

const AdminOrder = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector(state => state.adminOrder);

    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ id: orderId, orderStatus: newStatus }))

    };


    const renderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <Text style={styles.bold}>Mã đơn: {item._id}</Text>
            <Text style={styles.text} >Ngày: {item.orderDate.split("T")[0]}</Text>
            <Text >Tổng tiền: {item.totalAmount}$</Text>

            <View style={styles.statusRow}>
                <Text style={{ marginRight: 10 }}>Trạng thái:</Text>
                <Picker
                    selectedValue={item.orderStatus}
                    style={{ height: 50, width: 160 }}
                    onValueChange={(value) => handleStatusChange(item._id, value)}
                >
                    <Picker.Item label="Pending" value="pending" />
                    <Picker.Item label="InProcess" value="inprocess" />
                    <Picker.Item label="InShipping" value="inshipping" />
                    <Picker.Item label="Confirmed" value="confirmed" />
                    <Picker.Item label="Rejected" value="rejected" />
                </Picker>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản lý đơn hàng</Text>
            <FlatList
                data={orderList}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
            <FooterAdmin />
        </View>
    );
};

export default AdminOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    orderCard: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    bold: {
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    statusRow: {
        // marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        paddingBottom: 10,
    }
});
