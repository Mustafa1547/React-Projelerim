import React, { use, useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slice/basketSlice';

// Header bileşenini oluşturan ana fonksiyon.
function Header() {
    // 'theme' state'i, uygulamanın mevcut temasını (false: aydınlık, true: karanlık) tutar.
    // 'setTheme' fonksiyonu bu state'i güncellemek için kullanılır.
    const [theme, setTheme] = useState(false);

    // 'dispatch' fonksiyonu, Redux store'una action'lar göndermek için kullanılır.
    const dispatch = useDispatch();

    // 'navigate' fonksiyonu, sayfalar arası programatik geçiş yapmak için kullanılır.
    const navigate = useNavigate();

    // 'useSelector' hook'u ile Redux store'undaki 'basket' slice'ından 'products' dizisi alınır.
    // Bu, sepetteki ürün sayısını belirlemek için gereklidir.
    const { products } = useSelector((store) => store.basket);


    // Tema değiştirme mantığını içeren fonksiyon.
    const changeTheme = () => {
        // Tüm uygulamanın ana kapsayıcısı olan 'root' id'li elemente erişilir.
        const root = document.getElementById("root");
        // Eğer 'theme' state'i 'true' ise (karanlık mod aktifse), stilleri uygula.
        if (theme) {
            root.style.backgroundColor = "black";
            root.style.color = "#fff";
        }
        // Değilse (aydınlık mod aktifse), aydınlık mod stillerini uygula.
        else {
            root.style.backgroundColor = "#fff";
            root.style.color = "black";
        }
        // Mevcut tema durumunu tersine çevir (toggle işlemi).
        setTheme(!theme);
    }



    
    return (
     
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
         
            <div className='flex-row' onClick={() => navigate("/")}>
                <img className='logo' src="../src/images/logo.png" alt="Site Logosu" />
                <p className='logo-text'>Mustafa A.Ş</p>
            </div>
          
            <div className='flex-row'>
                <input className='search-input' type="text" placeholder='Bir şeyler ara' />
                <div>
                    {
                        theme ? <FaMoon className='icon' onClick={changeTheme} /> : <CiLight className='icon' onClick={changeTheme} />
                    }
                    {/* Sepet ikonu üzerinde ürün sayısını gösteren Badge bileşeni. */}
                    {/* 'badgeContent' prop'u, sepetteki ürün sayısını (products dizisinin uzunluğu) gösterir. */}
                    {/* Tıklandığında, sepet menüsünü açıp kapatan 'setDrawer' action'ı dispatch edilir. */}
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="error">
                        <CiShoppingBasket style={{ marginRight: "6px" }} className='icon' />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header;