import { createSlice } from "@reduxjs/toolkit";

// Tarayıcının yerel deposundan (LocalStorage) sepet verilerini çeker.
const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

// Mevcut sepet durumunu tarayıcının yerel deposuna (LocalStorage) kaydeder.
const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

// Sepet slice'ı için başlangıç durumu; ürünler, sepet menüsü ve toplam tutar.
const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

// Sepet state'ini, action'larını ve reducer'larını oluşturan ana fonksiyon.
export const basketlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        // Sepete yeni ürün ekler veya zaten varsa ürünün miktarını günceller.
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.count += action.payload.count;
            } else {
                state.products.push(action.payload);
            }
            writeFromBasketToStorage(state.products);
        },
        // Sepet menüsünün (drawer) açılıp kapanmasını sağlar.
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        // Sepetteki ürünlerin fiyatlarına göre toplam tutarı hesaplar.
        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products.forEach((product) => {
                state.totalAmount += product.price * product.count;
            })
        },
        // Belirtilen ürünü ID'sine göre sepetten kaldırır.
        deleteProduct: (state, action) => {
            const productId = action.payload;
            state.products = state.products.filter(product => product.id !== productId);
            writeFromBasketToStorage(state.products);
        }
    }
})

// Action'ları bileşenlerde 'dispatch' ile kullanabilmek için export eder.
export const { addToBasket, setDrawer, calculateBasket, deleteProduct } = basketlice.actions
// Ana reducer'ı Redux store'da birleştirmek üzere export eder.
export default basketlice.reducer