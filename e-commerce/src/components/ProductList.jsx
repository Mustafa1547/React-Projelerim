import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slice/productsSlice'
import Product from './Product';

function ProductList() {

    // 'dispatch' fonksiyonu, Redux store'una eylem (action) göndermek için kullanılır.
    const dispatch = useDispatch();

    // 'useSelector' hook'u ile Redux store'undaki 'product' diliminden (slice) 'products' dizisi alınır.
    const { products } = useSelector((store) => store.product);


    // 'useEffect' hook'u, bileşen ekrana ilk yüklendiğinde yalnızca bir kez çalışır (çünkü bağımlılık dizisi '[]' boştur).
    // Bu hook, tüm ürünleri getirmesi için 'getAllProducts' eylemini Redux'a gönderir.
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <div className='flex-row' style={{ flexWrap: "wrap", marginTop: "25px" }}>
            {
                products && products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList