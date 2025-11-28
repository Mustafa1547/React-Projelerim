
import { configureStore } from '@reduxjs/toolkit'
import appRedducer from '../redux/slice/appSlice'
import productRedducer from '../redux/slice/productsSlice'
import basketReducer from '../redux/slice/basketSlice'

export const store = configureStore({
  reducer: {
    app:appRedducer,
    product:productRedducer,
    basket:basketReducer

  },
})