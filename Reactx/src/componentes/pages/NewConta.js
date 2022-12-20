import ContaForms from "../formsConta/ContaForms";
import Styles from './NewConta.module.css'
import { useNavigate} from 'react-router-dom'
import validarString from '../../regex/Regex.js'
import { useState } from "react";

function NewConta(){

    const [conta,setConta]=useState({})

    const history=useNavigate()
    const [validarNomeConta,setValidarNomeConta]=useState(true)
    const [validarNomeProprietario,setValidarNomeProprietario]=useState(true)
    const [validarData,setValidarData]=useState(true)
    const [maiorDeIdade,setMaiorDeIdade]=useState(true)
    const [validarTipoConta,setValidarTipoConta]=useState(true)
    const [validarCpf,setValidarCpf]=useState(true)
    const Validator = require('cpf-rg-validator')
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

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

    function adicionarConta(){
  
            conta.cpfProprietario=conta.cpfProprietario.substring(0,3) + '.' + conta.cpfProprietario.substring(3,6)+'.'+conta.cpfProprietario.substring(6,9) + '-' + conta.cpfProprietario.substring(9,11)
    
                conta.saldo=0
                conta.acoes=[]
        
                fetch('http://localhost:5000/contas',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(conta)
                }).then(resp=>resp.json()).then(()=>history('/Contas',{state:{messageCriacao:'Conta criado com sucesso!'}})).catch(error=>console.log(error))
                
            
        }
        

    return(
        <>
            <div className={Styles.newConta}>
            <h2>Crie sua conta</h2>
            <h3>Comece agora a se organizar!!!</h3>
                <ContaForms adicionarConta={adicionarConta} conta={conta} setConta={setConta} validarNomeProprietario={validarNomeProprietario} validarNomeConta={validarNomeConta} validarConta={validarConta} validarData={validarData} maiorDeIdade={maiorDeIdade} validarCpf={validarCpf}/>

            </div>
        </>
    )
}
export default NewConta