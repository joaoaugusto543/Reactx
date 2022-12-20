import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../forms/Input"
import Select from "../forms/Select"
import Styles from './ContaEditar.module.css'
import validarString from '../../regex/Regex.js'
import MaskedInput from "../forms/maskInpit"
import ButtonDuplaFuncao from "../forms/buttonDuplaFuncao"
import Message from "../layout/message"

function EditarConta(){

    const idConta=useParams()
    const [conta,setConta]=useState()
    const [ContaNova,setContaNova]=useState()
    const [tiposContas,setTiposContas]=useState([])
    const [validarNomeConta,setValidarNomeConta]=useState(true)
    const [validarNomeProprietario,setValidarNomeProprietario]=useState(true)
    const [validarData,setValidarData]=useState(true)
    const [maiorDeIdade,setMaiorDeIdade]=useState(true)
    const [validarTipoConta,setValidarTipoConta]=useState(true)
    const [validarCpf,setValidarCpf]=useState(true)
    const [mensagemDeErro,setMensagemDeErro]=useState(false)
    const history=useNavigate()

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    const Validator = require('cpf-rg-validator')

  

 

    function ValidarNomeConta(){

        if (conta.nomeConta && conta.nomeConta.match(validarString)){
    
            setValidarNomeConta(false)
            return false
      
         }else{
             setValidarNomeConta(true)
             return true
         }


    }

    function ValidarNomeProprietario(){
        if ((conta.nomeProprietario && conta.nomeProprietario.match(validarString)) ){
            setValidarNomeProprietario(false)
            return false
        }else{
            setValidarNomeProprietario(true)
            return true

        }

    }

    function ValidarData(){

        if(conta.dataNascimento && parseInt(today.toISOString().substring(0,4))-parseInt(conta.dataNascimento)>=140){
            setValidarData(false)
            return true
         
        }else{
            setValidarData(true)
            return false
        }

    }

    function MaiorDeIdade(){

        if(conta.dataNascimento){
            if((parseInt(today.toISOString().substring(0,4))-parseInt(conta.dataNascimento.substring(0,4))<18) 
                     || (parseInt(today.toISOString().substring(0,4))-parseInt(conta.dataNascimento.substring(0,4))===18 && parseInt(today.toISOString().substring(5,7))<parseInt(conta.dataNascimento.substring(5,7)))
                     || (parseInt(today.toISOString().substring(0,4))-parseInt(conta.dataNascimento.substring(0,4))===18 && parseInt(today.toISOString().substring(5,7))===parseInt(conta.dataNascimento.substring(5,7)) && parseInt(today.toISOString().substring(8,10))<parseInt(conta.dataNascimento.substring(8,10)) )){
                    
                      setMaiorDeIdade(false)
                      return false  
            }else{
                setMaiorDeIdade(true)
                return true
            }
        }else{
            return false
        }

    
    }

    function ValidarTipoConta(){
        if( !conta.tipoConta){
            setValidarTipoConta(false)
            return false
        }else{
            setValidarTipoConta(true)
            return true
        }
    }

    function ValidarCpf(){
   
        if(conta.cpfProprietario && !Validator.cpf(conta.cpfProprietario)){
   
           setValidarCpf(false)
           return false
       }else{
           setValidarCpf(true)
           return true
       }

    

    }

    function validarConta(){

        ValidarNomeConta()
        ValidarNomeProprietario()
        ValidarData()
        MaiorDeIdade()
        ValidarTipoConta()
        ValidarCpf()

        if(conta.nomeConta ===''){
            setValidarNomeConta(false)
        }

        if(conta.nomeProprietario===''){
            setValidarNomeProprietario(false)
        }

        if(conta.dataNascimento===''){
            setValidarData(false)
        }

       

        if(!validarNomeConta ){
            return false
        }

        if(!validarNomeProprietario){
            return false
        }

        if(!validarData){
            return false
        }

        if(!maiorDeIdade){
            return false
        }

        if(!validarTipoConta){
            return false
        }

        if(!validarCpf){
            return false
        }

        if(conta.dataNascimento && conta.nomeConta  && conta.nomeProprietario && conta.cpfProprietario && conta.tipoConta && conta.tipoConta.id!==''){     
            return true
        }
        
    }


//...................................................................
    useEffect(()=>{
        fetch(`http://localhost:5000/contas/${idConta.id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>{
            setConta(data)
            setContaNova(data)
        })
    },[idConta])


//...................................................................

    useEffect(()=>{
        fetch('http://localhost:5000/tipoDeConta',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setTiposContas(data))
    },[])

//...................................................................

    function editarConta(){

        if(!conta.cpfProprietario.includes('.')){

            conta.cpfProprietario=conta.cpfProprietario.substring(0,3) + '.' + conta.cpfProprietario.substring(3,6)+'.'+conta.cpfProprietario.substring(6,9) + '-' + conta.cpfProprietario.substring(9,11)
        }         
        fetch(`http://localhost:5000/contas/${idConta.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(conta)
            }).then(resp=>resp.json()).then(data=>{
                setContaNova(data)
                setConta(data)               
            }).then(()=>history(`/Conta/${conta.id}`,{state:{messageEditadoComSucesso:'Conta editada!'}})).catch(error=>console.log(error))
           
    }

    function apararecerMensagemDeErro(){
        setMensagemDeErro(true)
        setTimeout(()=>{
            setMensagemDeErro(false)
        },3000)
    }

            
    function handleTipoConta(e){
       
        setConta({...conta,tipoConta:{
            id:e.target.value,
            tipo:e.target.options[e.target.selectedIndex].text   
        }})

    }

    function handleConta(e){
        setConta({...conta,[e.target.name]:e.target.value})
      
    }



    return(
        <>
            {conta && (
                <>
                    {mensagemDeErro && (<Message message={'Informações faltando ou digitadas erradas'} type={'error'} ></Message>)}
                    <div className={Styles.Conta}>
                        <h2>{ContaNova.nomeConta}</h2>
                        <p><span>Proprietário:</span> {ContaNova.nomeProprietario}</p>
                        <p><span>Saldo:</span> R${ContaNova.saldo}</p>
                        <p><span>CPF:</span> {ContaNova.cpfProprietario}</p>
                        <p><span>Data de nascimento:</span> {ContaNova.dataNascimento}</p>
                        <p><span>Tipo Conta:</span> {ContaNova.tipoConta.tipo}</p>  
                    </div>
        
                     <div className={Styles.forms}>
           
                        <Input type='text' name='nomeConta'  text='Nome da conta' placeholder='ex:Reactx' onChange={handleConta}  value={conta.nomeConta ? conta.nomeConta:''} ></Input>
                        {!validarNomeConta && (<p className={Styles.mensagemDeErro}>Nome da Conta Inválida!</p>) } 
                        <Input type='text' name='nomeProprietario'  text='Nome' placeholder='ex:João Ernesto' onChange={handleConta} value={conta.nomeProprietario ? conta.nomeProprietario:''} ></Input>
                        {!validarNomeProprietario && (<p className={Styles.mensagemDeErro}>Nome do proprietário Inválido!</p>)}
                        <MaskedInput type='text' mask="999.999.999-99" name='cpfProprietario' text='CPF' placeholder='ex:704.261.843-27' onChange={handleConta} value={conta.cpfProprietario ? conta.cpfProprietario:''}></MaskedInput>
                        {!validarCpf && (<p className={Styles.mensagemDeErro}>Cpf inválido!</p>) }
                        <Input type='date' name='dataNascimento' text='Data de nascimento' onChange={handleConta}  value={conta.dataNascimento ? conta.dataNascimento:''}></Input>
                        {!validarData && (<p className={Styles.mensagemDeErro}>Data Inválida!</p>)}
                        {!maiorDeIdade && (<p className={Styles.mensagemDeErro}>Tem que ter mais de 18 anos para criar uma conta!</p>)}
                        <Select name='tipoConta' text='Tipo da Conta' array={tiposContas} OnChange={handleTipoConta}  value={conta.tipoConta ? conta.tipoConta.id:''} ></Select>
                        <div>
                            <ButtonDuplaFuncao validacao={validarConta} funcaoUm={editarConta} funcaoDois={apararecerMensagemDeErro} text={'Editar Conta'}/>
                        </div>
                    </div>
    
                    
                </>
                
            )}

        </>
    )
}

export default EditarConta