import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, fetchCart, updateCart } from '../stores/shop/CartSlice';
import Footer from '../components/Layouts/Footer';
import { useNavigation } from '@react-navigation/native';



const CartScreen = () => {

    // const deliveryFee = 5;
    // const discount = 0.2; // 20%

    const { cartItems } = useSelector(state => state.shopCart);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart(user?.id));
    }, [dispatch, user?.id]);


    console.log("🚀 ~ CartScreen ~ subtotal:", subtotal)

    const handleUpdateQuantity = (getCartItems, type) => {
        const currentQty = getCartItems.quantity;

        if (type === 'minus' && currentQty <= 1) return;

        dispatch(updateCart({
            userId: user?.id,
            productId: getCartItems.productId,
            quantity:
                type === 'plus' ? getCartItems?.quantity + 1 : getCartItems?.quantity - 1
        }))
    }

    const handleRemoveCart = (getCartItems) => {
        dispatch(deleteCart({
            userId: user?.id,
            productId: getCartItems?.productId
        }))
    }

    const subtotal = cartItems?.items?.reduce(
        (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
        0
    ) || 0;

    // const finalTotal = subtotal + deliveryFee - subtotal * discount || 0;
    const finalTotal = subtotal || 0;

    const navigator = useNavigation();
    return (
        <>

            <ScrollView contentContainerStyle={styles.container}>
                {cartItems?.items?.map((item) => (
                    <View key={item?.id} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.color}>{item.color}</Text>
                            {item?.salePrice ? (<Text style={styles.price}>${item?.salePrice}</Text>)
                                : (<Text style={styles.price}>${item?.price}</Text>)}

                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => handleUpdateQuantity(item, 'minus')}>
                                <Icon name="remove-circle-outline" size={22} />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleUpdateQuantity(item, 'plus')}>
                                <Icon name="add-circle-outline" size={22} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveCart(item)}>
                            <Icon name="close-outline" size={22} />
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Promo code */}


                {/* Totals */}
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Subtotal:</Text>
                        <Text style={styles.value}>${subtotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Delivery Fee:</Text>
                        {/* <Text style={styles.value}>${deliveryFee}</Text> */}
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Discount:</Text>
                        {/* <Text style={styles.value}>{discount * 100}%</Text> */}
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.label, styles.totalLabel]}>Total:</Text>
                        <Text style={[styles.value, styles.totalValue]}>${finalTotal}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigator.navigate('Checkout')}>
                    <View style={styles.buttonCheckout}>
                        <Text style={styles.textCheckout}>Checkout</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            {/* <Footer /> */}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontWeight: 'semibold',
    },
    color: {
        color: '#888',
    },
    price: {
        marginTop: 4,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 8,
    },
    removeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    // promoContainer: {
    //     marginTop: 20,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 8,
    //     padding: 10,
    // },
    // promoInput: {
    //     borderBottomWidth: 1,
    //     borderColor: '#ccc',
    //     marginBottom: 8,
    //     padding: 4,
    // },
    // promoSuccess: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     gap: 5,
    // },
    // promoText: {
    //     color: 'green',
    // },
    summary: {
        marginTop: 20,
        gap: 5,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    label: {
        fontSize: 16,
    },
    value: {
        fontSize: 16,

    },
    totalLabel: {
        fontWeight: 'bold',
    },
    totalValue: {
        fontWeight: 'bold',
    },
    buttonCheckout: {
        backgroundColor: '#000',
        height: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    textCheckout: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 40,
    }

});

export default CartScreen;
