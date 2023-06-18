import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import Classes from './Modal.module.css'
const Backdrop = (props)=>{
    return <div className={Classes.backdrop}/>
}

const Overlay = (props)=>{
    return <div className={Classes.overlay}>
        <div>
        {props.children}
        </div>
    </div>
}

const Modal = (props)=>{
    const place = document.getElementById('overlay')
    return (
        <Fragment>
       {ReactDOM.createPortal(<Backdrop/>,place)}
       {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,place)}
       </Fragment>
    )
}
export default Modal;