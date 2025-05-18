import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    cartItems: []
}



//thêm sản phẩm vô giỏ
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
    const response = await axios.post("http://10.0.2.2:5000/api/shop/cart/add", {
        userId,
        productId,
        quantity
    })
    return response?.data
})



// lấy sản phẩm theo id user

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    const response = await axios.get(`http://10.0.2.2:5000/api/shop/cart/get/${userId}`);
    return response?.data
})



// thêm sửa sản phẩm giỏ 
export const updateCart = createAsyncThunk("cart/updateCart", async ({ userId, productId, quantity }) => {
    const response = await axios.put("http://10.0.2.2:5000/api/shop/cart/update-cart", {
        userId,
        productId,
        quantity
    })
    return response?.data
})





//xóa sản phẩm giỏ
export const deleteCart = createAsyncThunk("cart/deleteCart", async ({ userId, productId }) => {
    const response = await axios.delete(`http://10.0.2.2:5000/api/shop/cart/${userId}/${productId}`);

    return response?.data
})

// clear cart
export const clearCartOnServer = createAsyncThunk("cart/clearCartOnServer", async (userId) => {
    const response = await axios.delete(`http://10.0.2.2:5000/api/shop/cart/clear-cart/${userId}`);
    return response?.data;
});






const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.cartItems = []
        }
    },
    extraReducers: (builder) => {
        builder.
            // thêm
            addCase(addToCart.pending, state => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action?.payload?.data
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })

            // lấy
            .addCase(fetchCart.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })

            // update cart
            .addCase(updateCart.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })

            //delete
            .addCase(deleteCart.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload?.data
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })
            //clear
            .addCase(clearCartOnServer.pending, state => {
                state.isLoading = true;
            })
            .addCase(clearCartOnServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })
            .addCase(clearCartOnServer.rejected, (state, action) => {
                state.isLoading = false;
                state.cartItems = []
            })

    }
})
export const { clearCart } = shopCartSlice.actions;

export default shopCartSlice.reducer