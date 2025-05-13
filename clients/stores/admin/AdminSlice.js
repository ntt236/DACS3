import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: false,
    productList: []
}






//fetch product
export const fetchAllProduct = createAsyncThunk("/products/fetchAllProduct", async () => {
    const result = await axios.get("http://10.0.2.2:5000/api/admin/products/getall");
    return result?.data
})




// create product
export const addNewProduct = createAsyncThunk("/products/add-new-product", async (formData) => {
    const result = await axios.post("http://10.0.2.2:5000/api/admin/products/add", formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data
})






// update product

export const editProduct = createAsyncThunk(
    "products/edit-product", // Đặt tên đúng hơn cho action
    async ({ id, formData }) => { // Dùng destructuring để nhận tham số
        const result = await axios.put(
            `http://10.0.2.2:5000/api/admin/products/edit/${id}`,
            formData,
            {
                headers: { // Đúng key
                    'Content-Type': 'application/json',
                },
            }
        );
        return result?.data;
    }
);




// delete product

export const deleteProduct = createAsyncThunk("/products/deleteProduct", async (id) => {
    const result = await axios.delete(`http://10.0.2.2:5000/api/admin/products/delete/${id}`);

    return result?.data
})





const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.

            // fetch product
            addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.isLoading = false;
                state.productList = action?.payload?.data;
            })
            .addCase(fetchAllProduct.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
    })
})




export default adminProductSlice.reducer;