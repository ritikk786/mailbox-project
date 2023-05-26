import { createSlice } from "@reduxjs/toolkit";

const initialSentItem = {
    sentItem : [],
}

const SentItemSlicer = createSlice({
    name:'sentItem',
    initialState : initialSentItem,
    reducers : {
        addtoSentbox (state, action){
            console.log('inaddtosentbox', action.payload)
            state.sentItem = action.payload
        }
    }
})

export const sentItemAction = SentItemSlicer.actions;

export default SentItemSlicer.reducer;