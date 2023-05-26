import { configureStore, createSlice } from "@reduxjs/toolkit";
import loginhandlerReducer from './login-slice'
import SentItemSlicerReducer from './sentItem-slice'
import ReceiveItemSlicerReducer from './receiveItem-slice'

const Store = configureStore({
    reducer : {loginmanage:loginhandlerReducer , sentItem : SentItemSlicerReducer, receiveItem : ReceiveItemSlicerReducer}
})
export default Store;
