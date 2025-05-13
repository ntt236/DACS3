
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}





// fetch all sản phẩm trong listing
// export const fetchFilterProduct = createAsyncThunk(
//     "/products/fetchAllProducts",
//     async ({ filterParams, sortParams }) => {
//         // Làm sạch filterParams, chỉ giữ key có giá trị hợp lệ
//         const cleanedFilterParams = Object.fromEntries(
//             Object.entries(filterParams).filter(([key, value]) => Array.isArray(value) && value.length > 0)
//         );

//         const query = new URLSearchParams({
//             ...cleanedFilterParams, // Chỉ gửi các filter đã làm sạch
//             sortBy: sortParams,
//         });

//         const result = await axios.get(
//             `http://localhost:5000/api/shop/products/getall?${query}`
//         );

//         console.log("🚀 ~ fetchFilterProduct ~ result:", result);

//         return result?.data;
//     }
// );
export const fetchFilterProduct = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }) => {


        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        });

        const result = await axios.get(
            `http://10.0.2.2:5000/api/shop/products/getall?${query}`
        );

        console.log(result);


        return result?.data;
    }
);

// fetch all chi tiết sản phẩm
export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
        const result = await axios.get(
            `http://10.0.2.2:5000/api/shop/products/getall/${id}`

        );


        return result?.data;
    }
);



const shopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchFilterProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFilterProduct.fulfilled, (state, action) => {

                state.isLoading = false;
                state.productList = action?.payload?.data;
            })
            .addCase(fetchFilterProduct.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })


            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {

                state.isLoading = false;
                state.productDetails = action?.payload?.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productDetails = null;
            })

    }

})

export default shopProductSlice.reducer;