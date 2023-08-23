import './Security.css'
import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import useErrorsUpdate from '../../hooks/useErrorsUpdate'
import { resetSuccessMessage, update } from '../../slices/userSlices'

function Security() {

  const [password,setPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const {successMessage,loading}=useSelector((state)=>state.user)
  const {errorPassword}=useErrorsUpdate()
  const dispatch=useDispatch()

  function handleSubmit(e){
    e.preventDefault()

    const security={
      password,
      confirmPassword,
      newPassword
    }

    dispatch(update(security))

    setConfirmPassword('')
    setNewPassword('')
    setPassword('')
  }

  useEffect(()=>{
    dispatch(resetSuccessMessage())
  },[dispatch])

  useEffect(()=>{
    if(successMessage){
      setTimeout(()=>{
        dispatch(resetSuccessMessage())
      },3000)
    }
  },[dispatch,successMessage])

  return(
    <div className='security'>
          {loading && <Loader type='Page'/>}
          {!loading &&
            <>
              <h1>Alterar senha</h1>
              {errorPassword && <p className='errorSecurity'>{errorPassword}</p>}
              {successMessage && <p className='sucessMessage'>{successMessage}</p>}
              <form onSubmit={handleSubmit} className='securityForm'>
                  <label>
                      <span>Senha:</span>
                      <input type='password' required placeholder='Digite sua senha atual' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </label>
                  <label>
                      <span>Nova senha:</span>
                      <input type='password' required placeholder='Digite sua nova senha' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                  </label>
                  <label>
                      <span>Confirmação da nova senha:</span>
                      <input type='password' required placeholder='Digite sua nova senha' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                  </label>
                  <div className='button'>
                      <input type='submit' value='Editar senha'/>
                  </div>
              </form>
            </>
          }
      </div>
  )

}

export default Security