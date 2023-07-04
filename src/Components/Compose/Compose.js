import React, { useState, useRef, useMemo } from 'react';
import Classes from './Compose.module.css'
import useHook from '../../CustomHook/usehttpHook';
import JoditEditor from 'jodit-react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Compose = ()=>{
    console.log('Compose Component')
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const To = useRef();
    const Subject = useRef();
    const editor = useRef(null);
    const [loading, setLoading] = useState(false)
    const [content, setContent]=useState('')

    const {sendRequest} = useHook();

    const submithandler= async (event)=>{
        event.preventDefault();
        setLoading(true)
        console.log(To.current.value,Subject.current.value,editor.current.value,content)
        const recevierEmail = To.current.value.replace('@','').replace('.','')
        const senderEmail = email.replace('@','').replace('.','');
        const sentmail = {
            to : To.current.value,
            subject : Subject.current.value,
            message : editor.current.value,
        }
        const receivemail = {
            from : email,
            subject : Subject.current.value,
            message : editor.current.value,
            isread : false,
            date :  Date(),
        }
        const first = await sendRequest({
            url : `https://mail-box-july-default-rtdb.firebaseio.com/sent/${senderEmail}.json`,
            method : 'POST',
            body : sentmail
        })
       

        const second = await sendRequest({
            url : `https://mail-box-july-default-rtdb.firebaseio.com/recive/${recevierEmail}.json`,
            method : 'POST',
            body : receivemail,
        })
        

        //clera value 
        To.current.value='';
        Subject.current.value='';
        // editor.current.value='';
        setContent('')
        setLoading(false)
    }
    return(
        <div className={Classes.main}>
            <div className={Classes.heading}>
            <h3>Compose</h3>
        <hr/>
        </div>
        <form className={Classes.form} onSubmit={submithandler}>
            
            <input type="email" placeholder="To:"  ref={To} required/>
            <input type="text" placeholder="Subject:" ref={Subject} required/>
            <div className={Classes.editor}>
            <label>Message:</label>
            <JoditEditor
			ref={editor}
			value={content}
			
			tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
		/>
        </div>
        <button className={Classes.button} type='submit' >
            {loading && <Spinner animation="border" size="sm"/>}
            {!loading && 'Submit'}
            </button>
        </form>
        </div>
    )
}
export default Compose;