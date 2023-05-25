
import { Fragment, useContext, useEffect } from 'react';
import AuthForm from './Components/Authentication/Auth';
import Header from './Components/Header/Header'
import Welcome from './Components/Welcome/Welcome';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Classes from './App.module.css'
import Profile from './Components/Profile/Profile';
import Context from './Store/mainStore';
import { useDispatch, useSelector } from 'react-redux';
import { loginhandlerActions } from './Store/login-slice';


function App() {
  const ctx = useContext(Context)
  const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
  const dispatch = useDispatch();
  console.log(islogin, email,idToken,name)
  // const navigate =useNavigate();
  


  useEffect(()=>{
    const userStoredEmail=localStorage.getItem('email')
    const userStoredidToken = localStorage.getItem('idToken')
    const userStoredName = localStorage.getItem('name')

    if(userStoredidToken){

      dispatch(loginhandlerActions.loginmanagement({
        name : userStoredName || null,
        email : userStoredEmail,
        idToken: userStoredidToken,
    }))
    }
  },[dispatch])

  useEffect(()=>{
    if(islogin){
      localStorage.setItem('email',email);
      localStorage.setItem('idToken',idToken);
      if(name){
        localStorage.setItem('name',name)
      }
    }
    else{
      localStorage.clear()
    }
  },[email, idToken])
  return (
   

   <Fragment>
  
    <Routes>
     <Route path='/' element={!islogin ? <AuthForm/> : <Navigate to='/welcome/compose'/>}/>
      <Route path='welcome/*' element={!islogin ? <AuthForm/> : <Welcome/>}/>
    </Routes>
    
   </Fragment>
  );
}

export default App;
