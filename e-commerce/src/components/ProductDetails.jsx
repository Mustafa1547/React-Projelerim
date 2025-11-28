import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slice/productsSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket } from '../redux/slice/basketSlice';


function ProductDetails() {

    // useParams hook'u ile URL'den gelen 'id' parametresini yakalıyoruz. (Örn: /products/3)
    const { id } = useParams();

    // useSelector hook'u ile Redux store'daki 'product' state'inden tüm ürünleri ve seçili ürünü çekiyoruz.
    const { products, selectedProduct } = useSelector((store) => store.product);

    // Seçili üründen gelen bilgileri daha kolay kullanmak için değişkenlere atıyoruz (destructuring).
    const { price, image, title, description } = selectedProduct;

    // Sepete eklenecek ürün miktarını tutmak için bir local state tanımlıyoruz. Başlangıç değeri 0.
    const [count, setCount] = useState(0);

    // Redux'a action göndermek için dispatch fonksiyonunu hazırlıyoruz.
    const dispatch = useDispatch();

    // Ürün miktarını bir artıran fonksiyon.
    const increment = () => {
        setCount(count + 1)
    }

    // Ürün miktarını bir azaltan fonksiyon.
    const decrement = () => {
        setCount(count - 1)
    }

    // Ürünü sepete eklemek için hazırlanan fonksiyon.
    const addBasket = () => {
        // Sepete gönderilecek ürün bilgilerini ve adedini bir 'payload' objesinde topluyoruz.
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        // Hazırlanan payload ile 'addToBasket' action'ını Redux store'una gönderiyoruz.
        dispatch(addToBasket(payload))
    }

    // useEffect hook'u, component ilk yüklendiğinde bir kez çalışır (dependency array boş [] olduğu için).
    // Amacı, URL'deki id'ye göre doğru ürün bilgilerini bulup state'e işlemektir.
    useEffect(() => {
        getProductById();
    }, [])

    // Tüm ürünler listesi (products) içinde URL'den gelen id'ye sahip ürünü bulan fonksiyon.
    const getProductById = () => {
        // 'products' dizisi mevcutsa, her bir elemanını dön.
        products && products.map((product) => {
            // Eğer ürünün id'si URL'den gelen id ile eşleşiyorsa...
            if (product.id == id) {
                // ...bu ürünü 'seçili ürün' olarak Redux state'ine kaydetmek için action'ı dispatch et.
                dispatch(setSelectedProduct(product));
            }
        })
    }


    return (
        <div style={{ marginTop: "25px", display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: "40px" }}>
                <img src={image} width={300} height={500} alt="" />
            </div>
            <div>
                <h1 style={{ fontFamily: "arial" }}>{title}</h1>
                <p style={{ fontFamily: "arial", fontSize: "25px" }}>{description}</p>
                <h1 style={{ fontSize: "50px", fontFamily: "arial", fontWeight: "bold", color: "red" }}>{price}₺</h1>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CiCircleMinus onClick={decrement} style={{ fontSize: '40px', marginLeft: '15px' }} />
                    <span style={{ fontSize: '35px' }}>{count}</span>
                    <CiCirclePlus onClick={increment} style={{ fontSize: '40px', marginRight: '15px' }} />


                </div>
                <button
                    onClick={addBasket}
                    style={{
                        marginTop: '25px',
                        marginLeft: "20px",
                        border: 'none',
                        padding: '10px',
                        backgroundColor: 'rgb(185, 76, 76)',
                        color: '#fff',
                        borderRadius: '5px'
                    }}>Sepete Ekle</button>
            </div>
        </div>
    )
}


export default ProductDetails