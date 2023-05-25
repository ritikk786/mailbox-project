import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Context = createContext({
    isLogin : false,
})

export const ContextProvider = (props)=>{
    const [islogin, setIslogin] = useState(false)
    const navigate = useNavigate();

    const loginhandler = (data)=>{
        localStorage.setItem('email',data.email)
        localStorage.setItem('idToken',data.idToken)
        localStorage.setItem('name',data.displayName)
        navigate('/welcome')
        setIslogin(true)
        
    }

    const context = {
        isLogin : islogin,
        loginhandler : loginhandler,
    }
    return(
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export default Context