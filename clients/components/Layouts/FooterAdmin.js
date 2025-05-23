import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AntDesign from "react-native-vector-icons/AntDesign"
import { logoutUser } from '../../stores/auth/authSlice';
const FooterAdmin = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //   const loading = useReduxStateHook(navigation, "login");
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => navigation.navigate("Admin")}
            >
                <AntDesign
                    style={[styles.icon, route.name === "Admin" && styles.active]}
                    name="home"
                />
                <Text style={[styles.iconText, route.name === "Admin" && styles.active]}>
                    Product
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => navigation.navigate("Order")}
            >
                <AntDesign
                    style={[styles.icon, route.name === "Order" && styles.active]}
                    name="bells"
                />
                <Text
                    style={[
                        styles.iconText,
                        route.name === "Order" && styles.active,
                    ]}
                >
                    OrderDetails
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => navigation.navigate("account")}
            >
                <AntDesign
                    style={[styles.icon, route.name === "account" && styles.active]}
                    name="user"
                />
                <Text
                    style={[styles.iconText, route.name === "account" && styles.active]}
                >
                    Account
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => {
                    dispatch(logoutUser());

                }}
            >
                <AntDesign style={styles.icon} name="logout" />
                <Text style={styles.iconText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        marginTop: 10,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        padding: 10,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    menuContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 25,
        color: "#000000",
    },
    iconText: {
        color: "#000000",
        fontSize: 10,
    },
    activeIconWrapper: {
        backgroundColor: '#DCFCE7',
        padding: 10,
        borderRadius: 50,
    },

});
export default FooterAdmin