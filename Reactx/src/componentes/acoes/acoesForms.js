

import { Link } from 'react-router-dom'
import Input from '../forms/Input'
import Styles from './acoesForms.module.css'

function AcoesForms({text,ex,Acao,acao,setAcao,funcao,Conta,deletarConta}){


    function handleAcao(e){
      
        setAcao({...acao,[e.target.name]:e.target.value})
       
    }
    
    return(
        <div className={Styles.forms}>
                <Input tipo='acao' type='text' name='nomeAcao'  text={`Nome do ${text}`} placeholder={`ex:${ex}`} onChange={handleAcao} value={acao.nomeAcao ? acao.nomeAcao:''} ></Input>
                <Input tipo='acao' type='number' name='valor' text={`Valor que deseja ${Acao}`} placeholder='ex:1000' onChange={handleAcao} value={acao.valor ? acao.valor:''}></Input>
                {Conta.saldo>-3000 || Acao==='Depositar' ? (<button onClick={funcao} className={Styles.button} >{Acao}</button>):(<Link to={`Conta/${Conta.id}`} ><button onClick={deletarConta} className={Styles.button} >{Acao}</button></Link>)}
        </div>
    )
}

export default AcoesForms