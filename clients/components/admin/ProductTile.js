import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

const AdminProductTile = ({
    productList,
    setCurrentEditId,
    setOpenProduct,
    setFormData,
    handleDelete,
}) => {


    const handleEdit = () => {
        setCurrentEditId(productList?._id);
        setOpenProduct(true);
        setFormData({
            ...productList, price: productList.price?.toString(), // Đảm bảo giá trị là chuỗi để dễ thao tác
            salePrice: productList.salePrice?.toString(),
        });
        console.log(productList._id);

    };

    return (
        <ScrollView style={styles.card}>
            <Image
                source={{ uri: productList?.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text numberOfLines={1} style={styles.title}>
                    {productList?.title}
                </Text>
                <View style={styles.priceRow}>
                    <Text
                        style={[
                            styles.price,
                            productList?.salePrice > 0 && styles.strikeThrough,
                        ]}
                    >
                        ${productList?.price}
                    </Text>
                    {productList?.salePrice > 0 && (
                        <Text style={styles.salePrice}>${productList?.salePrice}</Text>
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => handleEdit()} style={styles.button}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDelete(productList?._id)}
                    style={styles.button}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 10,
        overflow: "hidden",
        elevation: 3,
        marginHorizontal: "1%",
    },
    image: {
        width: "100%",
        height: 200,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    price: {
        fontSize: 14,
        color: "#333",
    },
    strikeThrough: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    salePrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#E91E63",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    button: {
        padding: 6,
        backgroundColor: "#f1f1f1",
        borderRadius: 4,
    },
});

export default AdminProductTile;
