import { useDispatch } from 'react-redux'
import './Banned.css'
import { Link} from 'react-router-dom'
import { useEffect } from 'react'
import { resetErrors } from '../../slices/authSlices'

function Banned() {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(resetErrors())
  },[dispatch])

  return (
    <div className='banned'>
        <h1>X-X</h1>
        <h2>Sua conta foi banida <Link to='/login'>Voltar</Link></h2>
    </div>
  )
}

export default Banned