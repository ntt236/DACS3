// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
// Import action checkAuth

import { Text } from 'react-native';
import AdminDashBoard from './screens/AdminProductScreen';
// import Cart from './screens/Cart';
import CartScreen from './screens/Cart';
import ProductDetailScreen from './screens/DetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { checkAuth } from './stores/auth/authSlice';
import store from './stores/Store';
import AdminOrder from './screens/AdminOrder';
import AccountUser from './screens/AccountUser';
import OrderDetailsUser from './screens/OrderDetailsUser';

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  // Kiểm tra xác thực khi ứng dụng bắt đầu
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Nếu đang tải dữ liệu xác thực
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Nếu đã đăng nhập */}
        {isAuthenticated ? (
          <>
            {user?.role === "admin" ? (
              <>
                <Stack.Screen name="Admin" component={AdminDashBoard} options={{ headerShown: false }} />
                <Stack.Screen name="Order" component={AdminOrder} options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="Account" component={AccountUser} />
                <Stack.Screen name="Order" component={OrderDetailsUser} />
              </>
            )}
          </>


        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
