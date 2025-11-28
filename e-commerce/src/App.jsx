import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, deleteProduct } from './redux/slice/basketSlice'


function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  // products dizisi her değiştiğinde sepet toplamını yeniden hesapla
  useEffect(() => {
    dispatch(calculateBasket());
  }, [products, dispatch]) // <-- BAĞIMLILIK DİZİSİNİ GÜNCELLE

  // Silme fonksiyonu: Sadece action'ı dispatch eder.
  const deleteFromBasket = (productId) => {
    dispatch(deleteProduct(productId));
  }

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer sx={{ padding: "25px" }} anchor='right' onClose={() => dispatch(setDrawer())} open={drawer}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: "20px" }}>
                    <img style={{ marginRight: "5px", }} src={product.image} width={50} height={50} />
                    <p style={{ width: "320px", marginRight: "5px" }}> {product.title}({product.count})</p>
                    <p style={{ fontWeight: "bold", marginRight: "10px", width: "60px" }}>{product.price}TL</p>
                    <button style={{ padding: "5px", borderRadius: "5px", backgroundColor: "rgb(185,76,76)", border: "none", color: "#fff", width: "50px" }} onClick={() => deleteFromBasket(product.id)}>Sil</button>
                  </div>
                </div>
              )
            })
          }
          <div><p style={{ textAlign: "center" }}>Toplam Tutar : {totalAmount}</p></div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App