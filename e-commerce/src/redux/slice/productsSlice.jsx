import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Ürünler slice'ı için başlangıç state'i.
const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

// API istekleri için kullanılacak olan temel URL.
const BASE_URL = "https://fakestoreapi.com";

// API'den tüm ürünleri asenkron olarak çeken thunk action'ı.
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
})


// Ürünlerin state yönetimini yapan 'product' slice'ını oluşturur.
export const productSlice = createSlice({
    name: "product",
    initialState,
    // Senkron olarak çalışan ve state'i doğrudan değiştiren action'lar.
    reducers: {
        // Detay sayfasında gösterilecek ürünü state'e atar.
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    },
    // Asenkron thunk action'larının durumlarına (pending, fulfilled, rejected) göre state'i günceller.
    extraReducers: (builder) => {
        // 'getAllProducts' isteği başladığında yüklenme durumunu 'true' yapar.
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        // 'getAllProducts' isteği başarıyla tamamlandığında...
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            // ...yüklenme durumunu 'false' yapar.
            state.loading = false;
            // ...ve API'den gelen ürünleri 'products' state'ine atar.
            state.products = action.payload;
        })

    }
})

export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer