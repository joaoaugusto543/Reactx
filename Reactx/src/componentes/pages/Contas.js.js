import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from "../layout/loader"
import Message from "../layout/message"
import Styles from './Contas.module.css'


function Contas(){

    const location=useLocation()
    const [contas,setContas]=useState()
    const [aparecerLoader,setAparecerLoader]=useState(false)

  

    let message=''
    let messageExclusao=''
   

    if(location.state){
        message=location.state.messageCriacao
        messageExclusao=location.state.messageExclusao

    }

    useEffect(()=>{
        fetch('http://localhost:5000/contas',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>{
            setContas(data)
            setAparecerLoader(true)
        })
    },[])

    return(
        <>
   
        {messageExclusao &&(<Message message={messageExclusao} type='sucesso'/>)}
        {message &&(<Message message={message} type='sucesso'/>)}
        
        <div className={Styles.titulo}>
            <h1>Contas</h1>
            <Link to='/NewConta'><button>Criar conta</button></Link>
        </div>

        {!aparecerLoader && <Loader/>}
        {aparecerLoader && contas.length===0 &&(
            <h2>Você não possui conta</h2>
        )}
        <div className={Styles.conta}>
        {contas && contas.map((conta,index)=>(
        <Link  key={index} className={Styles.contaCard} to={`/Conta/${conta.id}`}>
            <div >
                <h2>{conta.nomeConta}</h2>
                <p><span>Proprietário:</span> {conta.nomeProprietario}</p>
                <p><span>Saldo:</span> R${conta.saldo}</p>
                <p><span>CPF:</span> {conta.cpfProprietario}</p>
                <p><span>Data de nascimento:</span> {conta.dataNascimento}</p>
                <p><span>Tipo Conta:</span> {conta.tipoConta.tipo}</p>
                <p className={Styles.aviso}>clique para abrir</p>
            </div>
        </Link>
        ))}

        </div>
        </>
  
     
    )
}
export default Contas