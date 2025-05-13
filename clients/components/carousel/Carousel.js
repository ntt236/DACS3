import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const slides = [
    'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2203,c_limit/18d4109f-3294-4c5b-852e-86f34bd3d770/nike-just-do-it.jpg',
    'https://example.com/image2.jpg',
];

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const flatListRef = useRef();

    const goToSlide = (index) => {
        const newIndex = (index + slides.length) % slides.length;
        setCurrentSlide(newIndex);
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                horizontal
                pagingEnabled
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                onMomentumScrollEnd={(e) => {
                    const index = Math.floor(e.nativeEvent.contentOffset.x / width);
                    setCurrentSlide(index);
                }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
            />

            {/* Nút trái */}
            <TouchableOpacity
                style={[styles.arrowButton, styles.leftButton]}
                onPress={() => goToSlide(currentSlide - 1)}
            >
                <AntDesign name="left" size={20} color="#000" />
            </TouchableOpacity>

            {/* Nút phải */}
            <TouchableOpacity
                style={[styles.arrowButton, styles.rightButton]}
                onPress={() => goToSlide(currentSlide + 1)}
            >
                <AntDesign name="right" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

export default ImageCarousel;

const styles = StyleSheet.create({
    container: {
        height: 300,
        position: 'relative',
    },
    image: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    arrowButton: {
        position: 'absolute',
        top: '50%',
        marginTop: -20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 999,
        elevation: 3,
    },
    leftButton: {
        left: 15,
    },
    rightButton: {
        right: 15,
    },
});
