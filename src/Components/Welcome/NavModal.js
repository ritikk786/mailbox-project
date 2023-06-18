import React from 'react'

import Modal from '../UI/Modal'
import Classes from './NavModal.module.css'

import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginhandlerActions } from "../../Store/login-slice";
import { Badge, Nav } from "react-bootstrap";
const NavModal = (props)=>{
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const receiveItem = useSelector((state)=>state.receiveItem.receiveItem)
    console.log(receiveItem,'propfile')
    const unread = useSelector((state)=>state.receiveItem.unread)
    console.log(unread,'unread')
    const dispatch = useDispatch();

    const logout=()=>{
       dispatch(loginhandlerActions.logoutmanagement())
    }
     let totalunreadmsg = 0;
     receiveItem.forEach(element => {
        if(element.isread===false){
            totalunreadmsg++
        }
     });
    console.log(totalunreadmsg,'totalunreadms')
    return (
        <Modal>
            <div style={{width:'100%'}}>
                <button onClick={props.onClick} className={Classes.backbtn}> <i className="fa fa-arrow-left" style={{ fontSize: "2vw" }}></i>
                    	</button>
            <div className={Classes.detail}>
                <img src="https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg"
                className={Classes.image} /><br/>
                <span>{email}</span>
                
            </div>
            <section>
                <header>
                    <navbar className={Classes.navbar}>
                       
                        <ul>
                            <li><NavLink  to='/welcome/compose'>Compose</NavLink></li>
                            <li><NavLink to='/welcome/inbox'>Inbox
                            <Badge className={Classes.badge} bg="secondary">{totalunreadmsg}</Badge>
                            </NavLink></li>
                            <li><NavLink to='/welcome/sentbox'>Sentbox</NavLink></li>
                            {/* <li><NavLink to='/welcome/setting'>Setting</NavLink></li> */}
                        </ul>
                    </navbar>
                   
                </header>
            </section>
            <div className={Classes.signout} >
                <button onClick={logout}>
                <span>
                    <i className="fa fa-sign-out" style={{ fontSize: "0.9rem" }}></i>
                    <span>Sign Out</span>
                </span>
                </button>
            </div>
        </div>
        </Modal>
    )
}
export default NavModal