import { createSlice } from "@reduxjs/toolkit";

const initialReceiveItem = {
    receiveItem : [],
}

const ReceiveItemSlicer = createSlice({
    name:'receiveItem',
    initialState : initialReceiveItem,
    reducers : {
        addtoInbox (state, action){
            console.log('inInbox function', action.payload)
            state.receiveItem = action.payload
        }
    }
})

export const receiveItemAction = ReceiveItemSlicer.actions;

export default ReceiveItemSlicer.reducer;