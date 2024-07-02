import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
    reducer:{
        cart: cartReducer,
    },
});

export default appStore;

// Reducer is kind a big object and it contains small reducers like cart , user etc 