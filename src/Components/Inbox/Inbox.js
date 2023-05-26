import React, { useEffect } from "react"
import Classes from './Inbox.module.css'
import { useDispatch, useSelector } from "react-redux"
import { sentItemAction } from "../../Store/sentItem-slice"
import { receiveItemAction } from "../../Store/receiveItem-slice"

const Inbox = ()=>{
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const receiveItem = useSelector((state)=>state.receiveItem.receiveItem)
    console.log('receiveItem', receiveItem)
    const dispatch = useDispatch()
    let myEmail = email.replace('@','').replace('.','')
    
    useEffect(()=>{
        const getmail = async ()=>{
            console.log(myEmail)
            const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}.json`)
            const data =await response.json()
            console.log(data)
            const newData = [];
            for(let key in data){
                newData.push({id:key, ...data[key]})
            }
            console.log(newData)
            dispatch(receiveItemAction.addtoInbox(newData))
        }
        getmail()
    },[])
    return(
        <div className={Classes.main}>
            <h3>Inbox</h3>
        <hr/>
       
        <div>
            <ul style={{padding:'0px'}}>
                {receiveItem.map((item)=>(
                    <li>
                        <div>{item.from}</div>
                        <div>{item.subject}</div>
                        
                        <div><i class="material-icons">delete</i></div>
                        
                    </li>
                ))}
            </ul>
        </div>
        </div>
    )
}
export default Inbox;