import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Classes from './ViewMail.module.css'
import { useEffect } from "react";

import { receiveItemAction } from "../../Store/receiveItem-slice";
import useHook from "../../CustomHook/usehttpHook";


const ViewMail = () => {
    const {sendRequest} = useHook();

    const { islogin, email, idToken, name } = useSelector((state) => state.loginmanage)
    console.log(email)
    let myEmail = email.replace('@', '').replace('.', '')
    console.log(myEmail)

    const dispatch = useDispatch()

    const param = useParams()
    const receiveItem = useSelector((state) => state.receiveItem.receiveItem)

    // const logicmail = receiveItem.findIndex((item) =>
    //     item.id === param.id
    // )
    // console.log(receiveItem[logicmail], logicmail, 'logicmil',)

    const viewmail = receiveItem.find((item) => (
        item.id === param.id
    ))
    console.log(viewmail, 'hello view')

    useEffect(() => {
        const newMail ={
            ...viewmail,
            isread: true,
        }

        sendRequest({
            url : `https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}/${viewmail.id}.json`,
            method : 'PUT',
            body : newMail,
        })
      
            // const response = await fetch(`https://mail-box-43616-default-rtdb.firebaseio.com/recive/${myEmail}/${viewmail.id}.json`, {
            //     method: 'PUT',
            //     body: JSON.stringify({
            //         ...viewmail,
            //         isread: true,
            //     })
            // })
            // const data = await response.json()
            // console.log(data)

            const logicmail = receiveItem.findIndex((item) =>
                item.id === param.id
            )
            const seenmail = receiveItem[logicmail];
            const updatedmail = {
                ...seenmail,
                isread: true,
            }
            const newData = [...receiveItem];
            newData[logicmail] = updatedmail
            dispatch(receiveItemAction.addtoInbox(newData))
            // dispatch(receiveItemAction.re)
            console.log('put data')
        

    }, [])
if(viewmail){

    var dateString = viewmail.date;
    var date = new Date(dateString);

    var timestamp = date.getTime();
    console.log(timestamp);
    
    var date = new Date();
    date.setTime(timestamp);
    console.log(date.getFullYear());

}

    // document.getElementById('message').innerHTML=viewmail.message
    return (
        <div className={Classes.main}>
            <h4>Subject : <em>{viewmail.subject}</em></h4>
            <h5>From : <em>{viewmail.from}</em></h5>
            
            <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
            {/* <p>{date.getHours()}-{date.getMinutes()}-{date.getSeconds()}</p> */}
            <hr />
            <h6>message:</h6>
            <div dangerouslySetInnerHTML={{ __html: viewmail.message }}></div>

            {/* <p id="message">{viewmail.message}</p> */}
        </div>
    )
}
export default ViewMail;