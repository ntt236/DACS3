import { useRoute } from '@react-navigation/native';
import React, { use, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../stores/shop/ProductSlice';
import { addToCart } from '../stores/shop/CartSlice';
import Footer from '../components/Layouts/Footer';

const ProductDetailScreen = () => {

    const { productDetails } = useSelector(state => state.shopProducts);
    // console.log("🚀 ~ ProductDetailScreen ~ productDetails:", productDetails)
    const { user } = useSelector(state => state.auth)
    const route = useRoute();

    const { productId } = route.params;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetails(productId));
        }
    }, [dispatch, productId]);

    if (!productDetails) return <Text>Loading...</Text>;

    const handleAddToCart = () => {
        dispatch(addToCart({
            userId: user?.id,
            productId: productDetails._id,
            quantity: 1
        }))
    }
    return (
        <>
            <ScrollView style={styles.container}>
                <Image
                    source={{ uri: productDetails.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />

                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>{productDetails.title}</Text>
                    </View>

                    <View style={styles.ratingRow}>
                        <Text style={styles.rating}><Icon name="star" color="orange" /> 4.8</Text>
                        <Text style={styles.rating}><Icon name="thumbs-up" color="green" /> 94%</Text>
                        <Text style={styles.reviewCount}>117 reviews</Text>
                    </View>

                    <Text style={styles.description}>{productDetails.description}</Text>

                </View>
            </ScrollView>
            <View style={styles.divider} />
            <View style={styles.bottomRow}>
                <View>
                    {productDetails.price && (
                        <Text style={styles.oldPrice}>${productDetails.price}</Text>
                    )}
                    <Text style={styles.newPrice}>${productDetails.salePrice}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(productDetails._id)}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            {/* <Footer style={styles.footer} /> */}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // position: 'relative',

    },
    productImage: {
        width: '100%',
        height: 300,
    },
    heartIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6,
        elevation: 3,
    },
    contentContainer: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    saleBadge: {
        backgroundColor: '#ff5252',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    saleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
    },
    rating: {
        fontSize: 14,
    },
    reviewCount: {
        fontSize: 12,
        color: '#888',
    },
    description: {
        marginVertical: 10,
        fontSize: 14,
        color: '#444',
    },
    storageOptions: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    storageButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    storageButtonGreen: {
        backgroundColor: '#c8f7c5',
        padding: 10,
        borderRadius: 8,
    },
    bottomRow: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 1,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#aaa',
        fontSize: 14,
        marginLeft: 5
    },
    newPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 5

    },
    addToCartButton: {
        margin: 5,
        backgroundColor: '#00C853',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 21,
        width: "40%",
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        // position: "absolute",
        // bottom: 0,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        // marginBottom: 8,
    },

});

export default ProductDetailScreen;
