import { ScrollView, StatusBar, View } from "react-native";
import ImageCarousel from "../carousel/Carousel"
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import FooterAdmin from "./FooterAdmin";
import { useEffect } from "react";
import { checkAuth } from "../../stores/auth/authSlice";
const Layout = ({ children }) => {

    const { isAuthenticated, user } = useSelector(state => state.auth)
    console.log("🚀 ~ Layout ~ user:", user)



    return (

        <View style={{ flex: 1 }}>
            <StatusBar />
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
                <ImageCarousel />
                {children}
            </ScrollView>
            <Footer />
        </View>
    );
};

export default Layout; 
