
import { Fragment, useContext, useEffect } from 'react';
import AuthForm from './Components/Authentication/Auth';
import Header from './Components/Header/Header'
import Welcome from './Components/Welcome/Welcome';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Profile from './Components/Profile/Profile';
import Context from './Store/mainStore';
import { useDispatch, useSelector } from 'react-redux';
import { loginhandlerActions } from './Store/login-slice';
import useHook from './CustomHook/usehttpHook';
import { receiveItemAction } from './Store/receiveItem-slice';


function App() {

  const { islogin, email, idToken, name } = useSelector((state) => state.loginmanage)
  console.log(email)
  const {sendRequest} = useHook();

  const dispatch = useDispatch();
  console.log(islogin, email, idToken, name)
  // const navigate =useNavigate();
  console.log('app component', email)


  useEffect(() => {
    const userStoredEmail = localStorage.getItem('email')
    const userStoredidToken = localStorage.getItem('idToken')
    const userStoredName = localStorage.getItem('name')
    if (userStoredidToken) {

      dispatch(loginhandlerActions.loginmanagement({
        name: userStoredName || null,
        email: userStoredEmail,
        idToken: userStoredidToken,
      }))
    }
  }, [])


  // useEffect(() => {
  //   const getmail = async () => {
  //     try {
  //       let myEmail = email.replace('@', '').replace('.', '')
  //       console.log(myEmail)
  //       const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}.json`)
  //       if (!response.ok) {
  //         throw new Error('Check you network connectivity')
  //       }
  //       const data = await response.json()

  //       console.log(data)
  //       const newData = [];
  //       for (let key in data) {
  //         newData.push({ id: key, ...data[key] })
  //       }
  //       console.log(newData)
  //       dispatch(receiveItemAction.addtoInbox(newData))
  //     }
  //     catch (error) {
  //       alert(error.message)
  //     }
  //   }

  //   if (email) {
  //     console.log('yes', email)
  //     getmail()
      // setInterval(() => {
      //   console.log('Interval')
      //   getmail()
      //   return (
      //     clearTimeout()
      //   )
      // }, 2000)

  //   }

  // }, [dispatch, email])

  useEffect(()=>{
    console.log('update after 3 sec')
    if(email){
      const reRenderfun= ()=>{

        let myEmail = email.replace('@', '').replace('.', '')
        const tranformdata = (data)=>{
          const newData = [];
          for (let key in data) {
            newData.push({ id: key, ...data[key] })
          }
          const revData = newData.reverse()
          dispatch(receiveItemAction.addtoInbox(revData))
        }
  
        sendRequest({
          url : `https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}.json`
        },
        tranformdata)
      }
      reRenderfun()
      // setInterval(()=>{
      //   reRenderfun()
      // },3000)
    }
  },[email])


  useEffect(() => {
    if (islogin) {
      localStorage.setItem('email', email);
      localStorage.setItem('idToken', idToken);
      if (name) {
        localStorage.setItem('name', name)
      }
    }
    else {
      localStorage.clear()
    }
  }, [email, idToken])



  return (


    <Fragment>

      <Routes>
        <Route path='/' element={!islogin ? <AuthForm /> : <Navigate to='/welcome/compose' />} />
        <Route path='/welcome/*' element={!islogin ? <AuthForm /> : <Welcome />} />
      </Routes>

    </Fragment>
  );
}

export default App;
