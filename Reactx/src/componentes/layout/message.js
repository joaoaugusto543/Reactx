import Styles from "./message.module.css"
import { useEffect, useState } from 'react'

function Message({message,type}){
    const [visivel,setVisivel]=useState(false)
    useEffect(()=>{
        if(!message){
            setVisivel(false)
            return
        }

        setVisivel(true)

        const time=setTimeout(()=>{
            setVisivel(false)
        },3000)

        return ()=>clearTimeout(time)
        
    },[message])
    return(
        <>
        {visivel && (
            <div className={`${Styles.mensagem} ${Styles[type]}`}>{message}</div>
        )}
        
        </>
    )
}
export default Message