import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import './Extrato.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import {getAccount } from '../../slices/accountSlices'
import { useEffect, useState} from 'react'
import {BsFillGearFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import ConfigExtrato from '../../components/ConfigExtrato/ConfigExtrato'
import openConfigExtrato from '../../scripts/ConfigExtrato/openConfigExtrato'
import closeConfigExtrato from '../../scripts/ConfigExtrato/closeConfigExtrato'

function Extrato() {

  const {account,loading}=useSelector((state)=>state.account)
  const [showConfigExtrato,setShowConfigExtrato]=useState(false)
  const [extrato,setExtrato]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>{

    if(account && account.extrato.length!==0){
      setExtrato(account.extrato)
    }
  },[account])

  useEffect(()=>{
    dispatch(getAccount())
  },[dispatch])

  function handleOpenConfigExtrato(){
    setShowConfigExtrato(true)
    openConfigExtrato()
  }

  function handleCloseConfigExtrato(){
    setShowConfigExtrato(false)
    closeConfigExtrato()
  }

  return (
    <div className='extratoPage'>
      {loading && <Loader type='Page'/>}
      <Link to='/' className='back'><AiOutlineArrowLeft/>Voltar</Link>
      <Link to='/' className='backMobile'><AiOutlineArrowRight/>Voltar</Link>
      <h1 className='titlePage'>Extrato</h1>
      {account && extrato.length!==0 &&
        <>
          <ConfigExtrato setExtrato={setExtrato} closeConfig={handleCloseConfigExtrato} extrato={account.extrato}/>
          {extrato.map((item,index)=>(
            <div className='extrato' key={index}>
              <p><span>Nome:</span> {item.name}</p>
              {item.CpfCensorship !=='none' && <p><span>CPF:</span> {item.CpfCensorship}</p>}
              <p><span>Valor:</span> {item.value.replace('.',',')}</p>
              <p><span>Data:</span> {item.date}</p>
              {item.description && <p><span>Descrição:</span> {item.description}</p>}
            </div>
          ))}
          {!showConfigExtrato ? <button className='configExtratoButton' onClick={handleOpenConfigExtrato}><BsFillGearFill/></button> : <button className='configExtratoButton' onClick={handleCloseConfigExtrato}><AiOutlineClose/></button>}
        </>
      }
      {account && account.extrato.length===0 && <p className='empty'>Seu extrato está vazio...</p>}
    </div>
  )
}

export default Extrato