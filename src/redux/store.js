import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from './wishlistSlice';
import appliedjobReducer from './appliedJobSlice'

export default configureStore({
    reducer: {
        wishlist: wishlistReducer,
        appliedjob : appliedjobReducer
        }
});