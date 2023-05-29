import { useCallback, useState } from 'react';

const useHook = ()=>{
    const [isLoading, setIsLoading]=useState();
    const [error, setError]=useState(null);

    const sendRequest =useCallback(async (requestConfig, applyData=null)=>{
        console.log(requestConfig.body)
        try{

            const response = await fetch(requestConfig.url,{
                method : requestConfig.method ? requestConfig.method : 'GET',
                body : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            console.log(response)
            if(!response.ok){
                throw new Error('Check Network Connectivity')
            }
            const data = await response.json();
            if(applyData){
                applyData(data)
            }
        }
        catch(error){
            alert(error.message)
        }
    },[])

    return{
        sendRequest,
    }
       
        
}

export default useHook;