import './Waiting.css'
import Clock from '../../img/clock.png'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetErrors } from '../../slices/authSlices'
import { Link } from 'react-router-dom'

function Waiting() {

  const dispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(resetErrors())
  },[dispatch])

  return (
    <div className='waiting'>
      <img src={Clock} alt='Relógio' />
      <h1>Sua conta ainda não foi autorizada, fique tranquilo , enviaremos um e-mail quando for autorizada. <Link to='/login' className='linkLogin'>Volte</Link></h1>
    </div>
  )
}

export default Waiting