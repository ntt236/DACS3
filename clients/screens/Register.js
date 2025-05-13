import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
// Giả sử bạn đã tạo slice cho redux
import { useNavigation } from '@react-navigation/native'; // Dùng để điều hướng trong React Native
import { registerFormControls } from "../config";
import CommonForm from '../components/common/Form';
import { registerUser } from '../stores/auth/authSlice';

const initialState = {
    userName: '',
    email: '',
    password: '',
};

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Điều hướng trong React Native

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            console.log(data);

            if (data?.payload?.success) {
                Alert.alert('Success', data?.payload?.message); // Hiển thị thông báo thành công
                navigation.navigate('Login'); // Điều hướng đến màn hình login
            } else {
                Alert.alert('Error', data?.payload?.message); // Hiển thị thông báo lỗi
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Account</Text>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            ></CommonForm>
            <View style={styles.footer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        maxWidth: 400,
        width: '100%',
        alignSelf: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    footerLink: {
        fontSize: 14,
        color: '#007AFF',
        marginLeft: 4,
        fontWeight: '600',
    },
});

export default Register;
