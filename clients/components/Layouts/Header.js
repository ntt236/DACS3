import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../stores/shop/CartSlice';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
    const [searchText, setSearchText] = useState("")

    const { cartItems, isLoading } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();


    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart(user?.id))
        }
    }, [dispatch, user?.id]);

    const navigaton = useNavigation();

    const totalCart = cartItems?.items?.reduce((acc, item) => acc + item.quantity, 0)
    console.log("🚀 ~ Header ~ cartItems:", cartItems)


    const handleSeach = () => {
        console.log(searchText);
        setSearchText("")
    }


    return (
        <View style={{ height: 90, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f3f3', paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={searchText}
                    onChangeText={(e) => setSearchText(e)}
                    placeholder="Search products..."
                />
                <TouchableOpacity style={styles.searchIcon} onPress={handleSeach}>
                    <FontAwesome name="search" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.cartContainer} onPress={() => navigaton.navigate("Cart")}>
                <FontAwesome name="shopping-cart" style={styles.iconCart} />
                {totalCart > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.badgeText}>{totalCart}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
        flex: 1,
        backgroundColor: 'white',
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
    },
    icon: {
        fontSize: 20,
        color: 'gray',
    },
    cartContainer: {
        position: 'relative',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    iconCart: {
        fontSize: 26,
        color: '#000',
    },
    cartBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
