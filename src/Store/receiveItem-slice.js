import { createSlice } from "@reduxjs/toolkit";

const initialReceiveItem = {
    receiveItem : [],
    unread : 0,
}

const ReceiveItemSlicer = createSlice({
    name:'receiveItem',
    initialState : initialReceiveItem,
    reducers : {
        addtoInbox (state, action){
            console.log('inInbox function', action.payload)
            state.receiveItem = action.payload
        },
        viewmail(state,action){
            console.log('viewmail',action.payload)
            state.receiveItem.push(action.payload)
        },
        unread(state,action){
           const isread = action.payload.item
           console.log(isread)
            if(!isread){
                state.unread++
            }
        }
    }
})

export const receiveItemAction = ReceiveItemSlicer.actions;

export default ReceiveItemSlicer.reducer;