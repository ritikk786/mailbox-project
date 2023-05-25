import React from "react";
import { Link, NavLink } from "react-router-dom";
import Classes from './Profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { loginhandlerActions } from "../../Store/login-slice";
import { Nav } from "react-bootstrap";
const Profile = () => {
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const dispatch = useDispatch();
    const logout=()=>{
       dispatch(loginhandlerActions.logoutmanagement())
    }
    return (
        <div style={{width:'100%'}}>
            <div className={Classes.detail}>
                <img src="https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg"
                className={Classes.image} /><br/>
                <span>{name}</span>
                
            </div>
            <section>
                <header>
                    <navbar className={Classes.navbar}>
                        <ul>
                            <li><NavLink  to='/welcome/compose'>Compose</NavLink></li>
                            <li><NavLink to='/welcome/inbox'>Inbox</NavLink></li>
                            <li><NavLink to='/inbox'>Sentbox</NavLink></li>
                            <li><NavLink to='/welcome/setting'>Setting</NavLink></li>
                        </ul>
                    </navbar>
                   
                </header>
            </section>
            <div className={Classes.signout} >
                <button onClick={logout}>
                <span>
                    <i className="fa fa-sign-out" style={{ fontSize: "18px" }}></i>
                    <span>Sign Out</span>
                </span>
                </button>
            </div>
        </div>
    )
}
export default Profile