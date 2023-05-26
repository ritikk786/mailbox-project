import React, { useEffect } from "react"
import Classes from './Sentbox.module.css'
import { useDispatch, useSelector } from "react-redux"
import { sentItemAction } from "../../Store/sentItem-slice"

const Sentbox = ()=>{
    const {islogin, email, idToken, name} = useSelector((state)=>state.loginmanage)
    const sentItem = useSelector((state)=>state.sentItem.sentItem)
    console.log('sentmaildata', sentItem)
    const dispatch = useDispatch()
    let myEmail = email.replace('@','').replace('.','')
    
    useEffect(()=>{
        const getSentmail = async ()=>{
            const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/sent/${myEmail}.json`)
            const data =await response.json()
            console.log(data)
            const newData = [];
            for(let key in data){
                newData.push({id:key, ...data[key]})
            }
            console.log(newData)
            dispatch(sentItemAction.addtoSentbox(newData))
        }
        getSentmail()
    },[])
    return(
        <div className={Classes.main}>
            <h3>Sentbox</h3>
        <hr/>
        <div>
            <ul style={{padding:'0px'}}>
                {sentItem.map((item)=>(
                    <li>
                        <div>{item.to}</div>
                        <div>{item.subject}</div>
                        
                        <div><i class="material-icons">delete</i></div>
                        
                    </li>
                ))}
            </ul>
        </div>
        </div>
    )
}
export default Sentbox