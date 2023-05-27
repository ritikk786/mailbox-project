import React, { useEffect } from "react"
import Classes from './Sentbox.module.css'
import { useDispatch, useSelector } from "react-redux"
import { sentItemAction } from "../../Store/sentItem-slice"

const Sentbox = () => {
    const { islogin, email, idToken, name } = useSelector((state) => state.loginmanage)
    const sentItem = useSelector((state) => state.sentItem.sentItem)
    console.log('sentmaildata', sentItem)
    const dispatch = useDispatch()
    let myEmail = email.replace('@', '').replace('.', '')

    useEffect(() => {
        const getSentmail = async () => {
            try{
                const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/sent/${myEmail}.json`)
                if(!response.ok){
                    throw new Error('Check you network connectivity')
                }
                const data = await response.json()
                console.log(data)
                const newData = [];
                for (let key in data) {
                    newData.push({ id: key, ...data[key] })
                }
                console.log(newData)
                dispatch(sentItemAction.addtoSentbox(newData))
            }
            catch(error){
                alert(error.message)
            }
           
        }
        getSentmail()
    }, [])

    const deleteSentmail= async(id)=>{
        try{
            const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/sent/${myEmail}/${id}.json`,{
                method : 'DELETE'
            })
            if(!response.ok){
                throw new Error('Check you network connectivity')
            }
            const data = await response.json();
            console.log(data)
            const newData = sentItem.filter((item)=>
                item.id !==id
            )
            dispatch(sentItemAction.addtoSentbox(newData))
        }
        catch(error){
            alert(error.message)
        }
    }

    return (
        <div className={Classes.main}>
            <div className={Classes.heading}>
                <h3>Sentbox</h3>
                <hr />
            </div>
            <div>
                <ul style={{ padding: '0px' }}>
                    {sentItem.map((item) => (
                        <li>
                            <div>{item.to}</div>
                            <div>{item.subject}</div>

                            
                            <button onClick={()=>deleteSentmail(item.id)} className={Classes.deleteicon}><i class="material-icons" style={{fontSize:'1.3vw',color:'red'}}>delete</i></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Sentbox