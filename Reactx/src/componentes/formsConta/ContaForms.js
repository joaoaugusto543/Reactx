import Input from '../forms/Input'
import Select from '../forms/Select'
import {useEffect, useState} from 'react'
import Message from '../layout/message'
import Styles from './ContaForms.module.css'
import MaskedInput from '../forms/maskInpit'


function ContaForms({adicionarConta,setConta,conta,validarNomeProprietario,validarNomeConta,validarConta,validarData,maiorDeIdade,validarCpf}){
    const [tiposContas,setTiposContas]=useState([])
    const [mensagemDeErro,setMensagemDeErro]=useState(false)

    function apararecerMensagemDeErro(){
        setMensagemDeErro(true)
        setTimeout(()=>{
            setMensagemDeErro(false)
        },3000)
    }
    
    
    useEffect(()=>{
        fetch('http://localhost:5000/tipoDeConta',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setTiposContas(data))
    },[])

    
    function handleTipoConta(e){
       
        setConta({...conta,tipoConta:{
            id:e.target.value,
            tipo:e.target.options[e.target.selectedIndex].text   
        }})

    }

    function handleConta(e){
        setConta({...conta,[e.target.name]:e.target.value})
       
    }
   



    return (
        <>
                {mensagemDeErro && (<Message message={'Informações faltando ou digitadas erradas'} type={'error'} ></Message>)}
                <Input type='text' name='nomeConta'  text='Nome da conta' placeholder='ex:Reactx' onChange={handleConta} value={conta.nomeConta ? conta.nomeConta:''} ></Input>
                {!validarNomeConta && (<p className={Styles.mensagemDeErro}>Nome da Conta Inválida!</p>) } 
                <Input type='text' name='nomeProprietario'  text='Nome' placeholder='ex:João Ernesto' onChange={handleConta} value={conta.nomeProprietario ? conta.nomeProprietario:''} ></Input>
                {!validarNomeProprietario && (<p className={Styles.mensagemDeErro}>Nome do proprietário Inválido!</p>)}
                <MaskedInput type='text' mask="999.999.999-99" name='cpfProprietario' text='CPF' placeholder='ex:704.261.843-27' onChange={handleConta} value={conta.cpfProprietario ? conta.cpfProprietario:''}></MaskedInput>
                {!validarCpf && (<p className={Styles.mensagemDeErro}>Cpf inválido!</p>) }
                <Input type='date' name='dataNascimento' text='Data de nascimento' onChange={handleConta} value={conta.dataNascimento ? conta.dataNascimento:''}></Input>
                {!validarData && (<p className={Styles.mensagemDeErro}>Data Inválida!</p>)}
                {!maiorDeIdade && (<p className={Styles.mensagemDeErro}>Tem que ter mais de 18 anos para criar uma conta!</p>)}
                <Select name='tipoConta' text='Tipo da Conta' array={tiposContas} OnChange={handleTipoConta} value={conta.tipoConta ? conta.tipoConta.id:''} ></Select>
                {validarConta() ? (<button className={Styles.button} onClick={adicionarConta} >Criar Conta</button>):(<button className={Styles.button} onClick={apararecerMensagemDeErro}>Criar Conta</button>)}
                
                
        </>
    )
}

export default ContaForms
