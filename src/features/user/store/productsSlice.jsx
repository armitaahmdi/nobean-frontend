import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products } from "../../../constants/productsData";

const initialState = {
    loading: false,
    products: [],
    error: ""
};

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return products; // فعلا محصولات فیک
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
export { fetchProducts };
