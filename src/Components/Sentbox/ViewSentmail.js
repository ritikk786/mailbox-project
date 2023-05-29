import { useParams } from 'react-router-dom'
import Classes from './ViewSentmail.module.css'
import { useSelector } from 'react-redux'
import useHook from '../../CustomHook/usehttpHook'

const ViewSentmail =()=>{
 
    const param = useParams()
    console.log(param.id,param)
    const sentItem = useSelector((state) => state.sentItem.sentItem)

    // const logicmail = receiveItem.findIndex((item) =>
    //     item.id === param.id
    // )
    // console.log(receiveItem[logicmail], logicmail, 'logicmil',)

    const viewmail = sentItem.find((item) => (
        item.id === param.id
    ))
    console.log(viewmail, 'hello view')
    return(
        <div className={Classes.main}>
            <h4>Subject : <em>{viewmail.subject}</em></h4>
            <h5>To : <em>{viewmail.to}</em></h5>
            
            {/* <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span> */}
            {/* <p>{date.getHours()}-{date.getMinutes()}-{date.getSeconds()}</p> */}
            <hr />
            <h6>message:</h6>
            <div dangerouslySetInnerHTML={{ __html: viewmail.message }}></div>

            {/* <p id="message">{viewmail.message}</p> */}
        </div>
    )
}
export default ViewSentmail;