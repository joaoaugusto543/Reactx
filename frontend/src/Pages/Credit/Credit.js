import './Credit.css'
import { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccount } from '../../slices/accountSlices'
import Loader from '../../components/Loader/Loader'
import { askingForCredit, resetErrors, resetSuccess } from '../../slices/creditSlices'

function Credit() {

  const [value,setValue]=useState('R$ 00,00')

  const {account,loading:loadingAccount}=useSelector((state)=>state.account)
  const {loading,errors,success}=useSelector((state)=>state.credit)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        dispatch(resetSuccess())
      },3000)
    }
  },[dispatch,success])

  useEffect(()=>{
    if(errors){
      dispatch(resetErrors())
    }
  },[dispatch,errors])

  useEffect(()=>{
    dispatch(getAccount())
  },[dispatch])

  function handleSubmit(e){
    e.preventDefault()

    const valueNumber=parseFloat(value.replace('R$ ','').replace(',','.'))

    const credit={
      value:valueNumber
    }

    dispatch(askingForCredit(credit))

    setValue('R$ 00,00')
  }

  function handleValue(e){
    const moneyValue=e.target.value

    const regexNumber=/^[0-9]+$/

    if(moneyValue==='R$ 00,000'){
      return
    }

    if(!regexNumber.test(moneyValue.replace('R$ ','').replace(',',''))){
      return
    }

    const valueArray=moneyValue.split('')

    const oldValueArray=moneyValue.split('')

    if(moneyValue.indexOf('0')===3 && moneyValue.length>value.length){

      valueArray[3]=''
  
      valueArray[5]=valueArray[6]
  
      valueArray[6]=oldValueArray[5]

      const finalValue=valueArray.join('')

      const moneyValueFloat=parseFloat(finalValue.replace('R$ ','').replace(',','.'))

      if(moneyValueFloat > 500){
        return
      }
  
      setValue(finalValue)

      return

    }

    if(moneyValue.indexOf('0')!==3 && moneyValue.length>value.length){

      const commaPosition=valueArray.indexOf(',')

      valueArray[commaPosition]=valueArray[commaPosition+1]

      valueArray[commaPosition+1]=oldValueArray[commaPosition]

      const finalValue=valueArray.join('')

      const moneyValueFloat=parseFloat(finalValue.replace('R$ ','').replace(',','.'))
      
      if(moneyValueFloat > 500){
        return
      }
  
      setValue(finalValue)

      return

    }

    if(moneyValue.length >= 8 && moneyValue.length < value.length){

      const commaPosition=valueArray.indexOf(',')

      valueArray[commaPosition]=valueArray[commaPosition-1]

      valueArray[commaPosition-1]=oldValueArray[commaPosition]

      setValue(valueArray.join(''))

      return

    }

    if(moneyValue.length < 8 && moneyValue.length < value.length && value !== 'R$ 00,00'){

      const commaPosition=valueArray.indexOf(',')

      valueArray[commaPosition]=valueArray[commaPosition-1]

      valueArray[commaPosition-1]=oldValueArray[commaPosition]

      valueArray[3]=`0${value[3]}`
    
      setValue(valueArray.join(''))

      return
    }


  }

  return (
    <div className='creditPage'>
      {loading && <Loader type='Page'/>}
      {loadingAccount && !loading &&< Loader type='Page'/> }
      {account &&
        <>
          <Link to='/' className='back'><AiOutlineArrowLeft/>Voltar</Link>
          <Link to='/' className='backMobile'><AiOutlineArrowRight/>Voltar</Link>
          <h1>Pedir crédito</h1>
          {errors && <p className='errorCredit'>Falha na requisição, verifique as informações</p>}
          {success && <p className='successCredit'>Requisição concluída</p>}
          <div className='creditValue'>
            <h2>Seu crédito: R$ {account.credit.replace('.',',')}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
                <span>Valor:</span>
                <input type='text' value={value} onChange={handleValue}/>
                <p className='maximumValue'>Valor máximo R$ 500,00</p>
            </label>
            <input type='submit' value='Enviar' />
          </form>
        </>
      }
    </div>
  )
}

export default Credit