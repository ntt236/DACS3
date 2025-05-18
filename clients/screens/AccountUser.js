import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Layouts/Footer';

const AccountUser = () => {
    const navigation = useNavigation();
    const { user } = useSelector(state => state.auth);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: user?.avatar || 'https://www.w3schools.com/w3images/avatar2.png' }}
                    style={styles.avatar}
                />
                <Text style={styles.username}>{user?.userName || 'Guest User'}</Text>
            </View>

            <TouchableOpacity
                style={styles.orderLink}
                onPress={() => navigation.navigate('Order')}
            >
                <Text style={styles.linkText}>🧾 Xem đơn hàng của tôi</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    );
};

export default AccountUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderLink: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    linkText: {
        fontSize: 16,
        color: '#007BFF',
    },
});
