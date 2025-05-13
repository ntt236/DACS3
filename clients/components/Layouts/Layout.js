import { ScrollView, StatusBar, View } from "react-native";
import ImageCarousel from "../carousel/Carousel"
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }) => {
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
