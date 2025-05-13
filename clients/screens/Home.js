import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../components/Layouts/Layout';

import ProductCard from '../components/products/ProductCard';

const Home = () => {
    return (
        <Layout >
            <ProductCard />
        </Layout>
    )
}



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

export default Home
