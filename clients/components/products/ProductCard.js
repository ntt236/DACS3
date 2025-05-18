import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilterProduct, fetchProductDetails } from '../../stores/shop/ProductSlice'
import { addToCart, fetchCart } from '../../stores/shop/CartSlice'
import { useNavigation } from '@react-navigation/native'

const ProductCard = () => {

    const { productList, productDetails } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    console.log("🚀 ~ ProductCard ~ user:", user)
    const dispatch = useDispatch()
    const navigation = useNavigation()



    useEffect(() => {
        dispatch(fetchFilterProduct({ filterParams: {}, sortParams: "price-lowtohigh" }))
    }, [dispatch, productDetails?._id])


    const handleProductDetails = (getCurrentProductID) => {
        console.log(getCurrentProductID);

        dispatch(fetchProductDetails(getCurrentProductID));
        navigation.navigate("ProductDetails", { productId: getCurrentProductID });

    }


    const handleAddToCart = async (getCurrentProductID) => {
        try {
            const resultAction = await dispatch(addToCart({
                productId: getCurrentProductID,
                quantity: 1,
                userId: user?.id
            }));
            const data = resultAction.payload;

            if (data?.success) {
                dispatch(fetchCart(user?.id));
            }
        } catch (err) {
            console.error("Thêm vào giỏ hàng thất bại:", err);
        }
    };




    return (
        <View style={styles.cardWrapper}>
            {productList && productList.length > 0
                ? productList.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Image
                            source={{ uri: item.image }} // dùng item.imageUrl nếu có
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 10 }}>
                            <Text style={styles.cardDesc}>
                                {item.brand}
                            </Text>
                            <Text style={{}}>{item.salePrice || item.price}$</Text>
                        </View>

                        <View style={styles.BtnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => handleProductDetails(item?._id)}>
                                <Text style={styles.btnText}>Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnCart} onPress={() => handleAddToCart(item?._id)}>
                                <Text style={styles.btnText}>ADD TO CART</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
                : null}
        </View>



    );

}

export default ProductCard

const styles = StyleSheet.create({
    cardWrapper: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    card: {

        borderWidth: 1,
        borderColor: "lightgray",
        marginBottom: 10,
        width: "48%",
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 8,
    },

    cardImage: {
        height: 120,
        width: "100%",
        marginBottom: 10,
    },
    cardTitle: {

        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardDesc: {
        fontSize: 10,
        textAlign: "left",
        justifyContent: "space-between",
    },
    BtnContainer: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#000000",
        height: 20,
        width: 75,
        borderRadius: 5,
        justifyContent: "center",
    },
    btnCart: {
        backgroundColor: "orange",
        height: 20,
        width: 75,
        borderRadius: 5,
        justifyContent: "center",
    },
    btnText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
    },



});