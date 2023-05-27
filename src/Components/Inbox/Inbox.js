import React, { useEffect } from "react"
import JoditEditor from 'jodit-react';
import Classes from './Inbox.module.css'
import { useDispatch, useSelector } from "react-redux"
import { sentItemAction } from "../../Store/sentItem-slice"
import { receiveItemAction } from "../../Store/receiveItem-slice"
import { Link, Navigate } from "react-router-dom"

const Inbox = ()=>{
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const receiveItem = useSelector((state)=>state.receiveItem.receiveItem)
    // const unread = useSelector((state)=>state.receiveItem.unread)
    console.log('receiveItem', receiveItem,email)
    const dispatch = useDispatch()
    // const navigate = Navigate()
    let myEmail = email.replace('@','').replace('.','')
    let deletebtnState = false;
    // useEffect(()=>{
    //     const getmail = async ()=>{
    //         console.log(myEmail)
    //         const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}.json`)
    //         const data =await response.json()
    //         console.log(data)
    //         const newData = [];
    //         for(let key in data){
    //             newData.push({id:key, ...data[key]})
    //         }
    //         console.log(newData)
    //         dispatch(receiveItemAction.addtoInbox(newData))
    //     }
    //     getmail()
    // },[])
    const list = ()=>{
        if(!deletebtnState){

            console.log('onListITem')
        }
    }
    const deletefunction=(item)=>{
        deletebtnState = true;
        console.log('deletebtn',item)
        deletebtnState = false;
        const response = fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}/${item.id}.json`,{
            method : 'DELETE',
        })
        const newData = receiveItem.filter((mails)=>
            mails.id !== item.id
            )
            console.log('after delete', newData)
            dispatch(receiveItemAction.addtoInbox(newData))
    }

  

    return(
        <div className={Classes.main}>
            <div className={Classes.heading}>
            <h3>Inbox</h3>
        <hr/>
        </div>
        <div>
            {receiveItem.length===0 && <p>No message</p>}
            <ul className={Classes.ul} >
                {receiveItem.map((item)=>(<>
                    
                    <li >
                        
                        <div className={Classes.openmail} >
                     {!item.isread && <span><i class="fa fa-circle" style={{fontSize:'1.3vw', color:'blue'}}></i></span> }  
                     {item.isread && <span><i class="fa fa-circle" style={{fontSize:'1.3vw'}}></i></span> }  
                        <Link to={`/welcome/inbox/${item.id}`}>
                        <div>{item.subject}</div>
                        <div style={{fontSize:'1.3vw'}}>{item.from} </div>
                        </Link>
                        </div>
                        <button className={Classes.deleteicon}  onDoubleClick={()=>deletefunction(item)}><i class="material-icons" style={{fontSize:'1.3vw',color:'red'}}>delete</i></button>
                        
                    </li>
                    </>
                ))}
            </ul>
        </div>
        </div>
    )
}
export default Inbox;