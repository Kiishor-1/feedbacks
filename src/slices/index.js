import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import reviewReducer from './reviewSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        review:reviewReducer,
    }
})

export default store;