import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import fetchProductReducer from './shop/ProductSlice'
import shopCartReducer from './shop/CartSlice';
import adminProductsReducer from './admin/AdminSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        shopProducts: fetchProductReducer,
        shopCart: shopCartReducer,
        adminProducts: adminProductsReducer,
    },
});

export default store;
