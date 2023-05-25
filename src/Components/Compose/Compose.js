import React, { useState, useRef, useMemo } from 'react';
import Classes from './Compose.module.css'

import JoditEditor from 'jodit-react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Compose = ()=>{
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const To = useRef();
    const Subject = useRef();
    const editor = useRef(null)
    const [content, setContent]=useState('')

    const submithandler= async (event)=>{
        event.preventDefault();
        console.log(To.current.value,Subject.current.value,editor.current.value,content)
        const recevierEmail = To.current.value.replace('@','').replace('.','')
        const senderEmail = email.replace('@','').replace('.','');
        const sentmail = {
            to : To.current.value,
            subject : Subject.current.value,
            message : editor.current.value,
        }
       
        const Senderresponse = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/sent/${senderEmail}.json`,{
            method : 'POST',
            body : JSON.stringify(sentmail)
        })
        const Senderdata = Senderresponse.json();
        console.log(Senderdata)

        const Reciverresponse = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${recevierEmail}.json`,{
            method : 'POST',
            body : JSON.stringify(sentmail)
        })
        const Reciverdata = Reciverresponse.json();
        console.log(Reciverdata)
    }
    return(
        <div className={Classes.main}>
            <h3>Compose</h3>
        <hr/>
        <form className={Classes.form} onSubmit={submithandler}>
            
            <input type="text" placeholder="To:" ref={To} required/>
            <input type="text" placeholder="Subject:" ref={Subject} required/>
            <div>
            <labe>Message:</labe>
            <JoditEditor
			ref={editor}
			value={content}
			
			tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
		/>
        </div>
        <Button type='submit' className='mt-2'>Submit</Button>
        </form>
        </div>
    )
}
export default Compose;