import { configureStore, createSlice } from "@reduxjs/toolkit";
import loginhandlerReducer from './login-slice'

const Store = configureStore({
    reducer : {loginmanage:loginhandlerReducer}
})
export default Store;
