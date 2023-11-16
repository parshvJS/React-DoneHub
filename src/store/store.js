import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
const store=configureStore({
    reducer:{
        todo:authSlice
    }
})


export default store;