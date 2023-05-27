import { createSlice } from "@reduxjs/toolkit"



const initailloginState = {
    islogin : false,
    email : null,
    idToken : null,
    name : null,
    
}

export const loginhandler = createSlice({
    name:'login',
    initialState : initailloginState,
    reducers :{
        loginmanagement (state,action){
            console.log(action,'inloginmanagement')
            state.islogin = true
            state.email = action.payload.email
            state.idToken = action.payload.idToken
            state.name = action.payload.name

        },
        logoutmanagement (state,action){
            console.log(action)
            state.islogin = false
            state.email = null
            state.idToken =null
            state.name = null
            
        }
    }
})




export const loginhandlerActions  = loginhandler.actions;

export default loginhandler.reducer;