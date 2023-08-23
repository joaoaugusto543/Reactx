import { Link } from 'react-router-dom'
import './Support.css'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { resetMessageError, resetMessageSuccess, support } from '../../slices/supportSlices'
import { profile } from '../../slices/userSlices'

function Support() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')

  const dispatch=useDispatch()

  const {messageError,messageSuccess,loading}=useSelector((state)=>state.support)
  const {user,loading:loadingUser}=useSelector((state)=>state.user)
  const {auth,loading:loadingAuth}=useSelector((state)=>state.auth)

  useEffect(()=>{
    dispatch(profile())
  },[dispatch])

  useEffect(()=>{

    if(messageSuccess){
      setTimeout(()=>{
        dispatch(resetMessageSuccess())
      },3000)
    }

  },[messageSuccess,dispatch])

  useEffect(()=>{

    if(messageError){
      setTimeout(()=>{
        dispatch(resetMessageError())
      },3000)
    }

  },[messageError,dispatch])

  useEffect(()=>{
    if(user){
      setName(user.name)
      setEmail(user.email)
    }

  },[user])

  function handleSubmit(e){
    e.preventDefault()

    const supportEmail={
      name,
      email,
      message
    }

    dispatch(support(supportEmail))

    if(user){
      setName(user.name)
      setEmail(user.email)
      setMessage('')
      return
    }

    setName('')
    setEmail('')
    setMessage('')
  }


  function handleMessage(e){
    const value=e.target.value

    if(value.length > 300){
      return
    }

    setMessage(value)
  }

  return (
    <div className={!auth ? 'support NoAuth' : 'support'}>
      {loadingAuth && <Loader type='Page'/>}
      {loading && !loadingUser && !loadingAuth && <Loader type='Page'/>}
      {!loading && loadingUser && !loadingAuth && <Loader type='Page'/>}
      {!loading && !loadingUser && !loadingAuth &&
        <>
          {auth && <Link to='/' className='back'><AiOutlineArrowLeft/>Voltar</Link>}
          {auth && <Link to='/' className='backMobile'><AiOutlineArrowRight/>Voltar</Link>}
          {!auth && <Link to='/login' className='backMobile'><AiOutlineArrowRight/>Voltar</Link>}
          {!auth && <Link to='/login' className='back'><AiOutlineArrowLeft/>Voltar</Link>}
          <h1>Suporte</h1>
          {messageSuccess && <p className='successSupport'>{messageSuccess}</p>}
          {messageError && <p className='errorSupport'>{messageError}</p>}
          <form onSubmit={handleSubmit}>
              <label>
                  <span>Nome *</span>
                  <input type='text' required placeholder='Digite seu nome' value={name} onChange={(e)=>setName(e.target.value)}/>
              </label>
              <label>
                  <span>E-mail *</span>
                  <input type='email' required placeholder='Digite seu email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </label>
              <label>
                  <span>Mensagem *</span>
                  <p className='characterCounter'>{message.length}/300</p>
                  <textarea required placeholder='Digite sua mensagem' value={message} maxLength={300} onChange={handleMessage}/>
              </label>
              <input type='submit' value='Enviar' />
          </form>
        </>

      }
  </div>
  )
}

export default Support