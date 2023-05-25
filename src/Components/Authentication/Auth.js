import React, {  Fragment, useContext, useRef, useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Classes from './Auth.module.css'
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Context from "../../Store/mainStore";
import { useDispatch } from "react-redux";
import { loginhandlerActions } from "../../Store/login-slice";


const AuthForm = () => {
    const[isLogin, setIsLogin] = useState(true);
    const [passwordmatch, setPasswordmatch]=useState(false)
    const [spiner, setSpiner]=useState(false)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const ctx = useContext(Context);

    const emailvalue = useRef();
    const passwordvalue=useRef();
    const confirmpasswordvalue=useRef();

    const switchloginsigin = ()=>{
        console.log(isLogin)
        setIsLogin((prevState)=> !prevState)
    }

    const matchpassword =()=>{
        
        if(passwordvalue.current.value.trim() === confirmpasswordvalue.current.value.trim()){
            console.log('match')
            setPasswordmatch(true)
        }
    }

    const submithandler = async (e)=>{
        e.preventDefault();
        setSpiner(true)
        console.log('1')
        const email = emailvalue.current.value;
        const password = passwordvalue.current.value;
        try{
            console.log('2', emailvalue.current.value,passwordvalue.current.value,)
           

                if(isLogin){
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARKjUtf5SXha7RRaBTIIcuDXuUnMlUw0c',{
                        method:'POST',
                        body: JSON.stringify({
                            email:email,
                            password:password,
                            returnSecureToken:true,
                        }),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    const data = await response.json()
                    if(!response.ok){
                        throw new Error(`${data.error.message}`)
                    }
                    console.log(data)
                    dispatch(loginhandlerActions.loginmanagement({
                        name : data.displayName || null,
                        email : data.email,
                        idToken: data.idToken,
                    }))
                    // ctx.loginhandler(data)
                    // clear value
                    emailvalue.current.value='';
                    passwordvalue.current.value='';
                    // cleravalue()
                    navigate('/welcome/inbox')
                }
                else{
                    if(passwordmatch){
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARKjUtf5SXha7RRaBTIIcuDXuUnMlUw0c',{
                        method:'POST',
                        body: JSON.stringify({
                            email:email,
                            password:password,
                            returnSecureToken:true,
                        }),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    const data = await response.json()
                    if(!response.ok){
                        throw new Error(`${data.error.message}`)
                    }
                    console.log(data)
                    console.log('user succesfully signup')
                    // clear value
                    cleravalue()
                    alert('Congratulation')
                }
                else{
                    alert('Password not match')
                    // else condition
                }
            }
            
        }
        catch(error){
            alert(error.message)
        }
        setSpiner(false)
       
    }

    function cleravalue (){
        emailvalue.current.value = '';
        passwordvalue.current.value = '';
        confirmpasswordvalue.current.value = '';
    }


    return (
        <Fragment>
            <Header/>
        <div className={Classes.container}>
            <div className={Classes.box}>
                <Card className={`${Classes.card} shadow-lg`}>
                    <Card.Body>
                        <Card.Title className={Classes.title}><h2>{isLogin ? 'Login' : 'Signup'}</h2></Card.Title>
                        <form onSubmit={submithandler}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" ref={emailvalue} placeholder="name@example.com" required/>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control type="password" placeholder="enter your password" ref={passwordvalue} required/>
                            </FloatingLabel>
                            {!isLogin && <FloatingLabel
                                controlId="floatingInput"
                                label="Confirm Password"
                                className="mb-3"
                            >
                                <Form.Control type="password" ref={confirmpasswordvalue} placeholder="confirm your password" required onChange={matchpassword}/>
                            </FloatingLabel> }
                            
                            <div className="d-grid gap-2">
                                <Button variant="primary" className='mb-3' type="submit"  >
                                {spiner && <Spinner animation="border" size="sm" />}
                                { !spiner &&  isLogin && 'Login'}
                                { !spiner &&  !isLogin && 'Submit'}
                                {/* { !spiner &&  isLogin ? 'Login' : 'Submit '} */}
                                    
                                </Button>
                            </div>

                            {/* <Link to="/login/forgot password" className={Classes.forgot}>
                           {isLogin ? "Forgot Password ?" : ''}
                           </Link> */}

                        </form>
                        <button className={Classes.loginorsignup} onClick={switchloginsigin}>
                        {isLogin ? 'Create an Account' : ' Have an Account?Login '}
                           
                        </button>
                        
                    </Card.Body>
                </Card>
            </div>
        </div>
        </Fragment>
    )
}
export default AuthForm;