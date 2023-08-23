import { useDispatch } from 'react-redux'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../slices/authSlices'
import {AiOutlineArrowUp} from 'react-icons/ai'

function Login() {

  const dispatch=useDispatch()

  const [cpf,setCpf]=useState('')
  const [password,setPassword]=useState('')

  function handleSubmit(e){

    e.preventDefault()

    const newSession={
      cpf,
      password
    }

    dispatch(login(newSession))
    
  }

  function handleCpf(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('.').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===11 && (value.indexOf('.')===-1 || value.indexOf('-')===-1)){
      const cpfWithDot=`${noPunctuation.substring(0,3)}.${noPunctuation.substring(3,6)}.${noPunctuation.substring(6,9)}-${noPunctuation.substring(9,11)}`
      setCpf(cpfWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setCpf(e.target.value)
    }

    if(cpf.length-1>=value.length){
      setCpf(e.target.value)
      return
    }
       
    if(value.length===3 || value.length===7){
      setCpf(value + '.')
    }

    if(value.length===11){
      setCpf(value + '-')
    }

    return

  }

  return (
    <div className='login'>
        <section className='banner'>
          <img src='https://images.unsplash.com/photo-1496360711189-5edeb09fe715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' alt='mulher sorrindo' />
        </section>
        <div className='loginForm'>
          <h1>Reactx</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <span>CPF:</span>
              <input type='text' placeholder='Digite seu cpf' value={cpf} onChange={handleCpf} />
            </label>
            <label>
              <span>Senha:</span>
              <input type='password' placeholder='Digite sua senha' onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <p className='linkSupport'>Algum problema? <Link to='/support'>Suporte</Link></p>
            <input type='submit' value='Entrar' />
          </form>
          <p className='dragUpLogin'>Arrasta pra cima<AiOutlineArrowUp/></p>
          <p className='withoutAccount'>Não possui uma conta? <Link to='/register'>Cadastre-se</Link></p>
        </div>
    </div>
  )
}

export default Login