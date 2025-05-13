import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonForm from '../components/common/Form';

import { loginFormControls } from '../config/index';
import { loginUser } from '../stores/auth/authSlice';

const initialState = {
    email: '',
    password: '',
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSubmit = () => {
        dispatch(loginUser(formData)).then((data) => {
            console.log(data);

            if (data.payload?.success) {
                Alert.alert('Success', data.payload.message);
                // chuyển hướng nếu cần
                // navigation.navigate('home');
            } else {
                Alert.alert('Error', data?.payload?.message || 'Login failed');
                console.log("🚀 ~ dispatch ~ message:", user)

            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>
            <CommonForm
                formControls={loginFormControls}
                buttonText="Sign in"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerLink}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

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
