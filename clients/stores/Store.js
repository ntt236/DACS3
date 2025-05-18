import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import fetchProductReducer from './shop/ProductSlice'
import shopCartReducer from './shop/CartSlice';
import adminProductsReducer from './admin/AdminSlice';
import shoppingOrderReducer from './shop/OrderSlice';
import adminOrderReducer from './admin/OrderSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,


        adminProducts: adminProductsReducer,
        adminOrder: adminOrderReducer,


        shopProducts: fetchProductReducer,
        shopCart: shopCartReducer,
        order: shoppingOrderReducer
    },
});

export default store;
