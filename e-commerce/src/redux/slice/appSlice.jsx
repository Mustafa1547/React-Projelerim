import { createSlice } from "@reduxjs/toolkit";

// Uygulamanın genel durumları için başlangıç state'ini tanımlıyoruz.
// 'loading: false' başlangıçta herhangi bir yükleme işleminin olmadığını belirtir.
const initialState = {
    loading: false
}

// 'createSlice' ile uygulama genelindeki state'leri yönetecek olan 'app' adında bir slice oluşturuyoruz.
export const appSlice = createSlice({
    
    name: "app", // Slice'a verilecek olan isim. Redux DevTools'da bu isimle görünür.
    initialState,
    // Senkron (anlık) state değişikliklerini yönetecek olan action'ların tanımlandığı yer.
    // Örn: setLoading gibi bir action burada tanımlanabilirdi. Şimdilik boş.
    reducers: {

    },
    // Diğer slice'larda tanımlanan action'lara veya asenkron thunk'lara (pending, fulfilled, rejected durumları)
    // tepki vermek için kullanılır. Genellikle loading durumunu yönetmek için idealdir.
    // Örn: Bir ürün çekme işlemi başladığında loading'i true, bitince false yapmak için kullanılır. Şimdilik boş.
    extraReducers: (builder) => {

    }
})


export const { } = appSlice.actions

export default appSlice.reducer  // Oluşturulan slice'ın reducer'ını, ana Redux store'da birleştirmek üzere export ediyoruz.