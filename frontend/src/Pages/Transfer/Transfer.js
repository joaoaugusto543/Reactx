import { useEffect, useState } from 'react'
import './Transfer.css'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { resetErrors, resetSuccess, transition } from '../../slices/accountSlices'
import Loader from '../../components/Loader/Loader'

function Transfer() {

  const [value,setValue]=useState('R$ 00,00')
  const [description,setDescription]=useState('')
  const [code,setCode]=useState('0805 / ')
  const {loading,errors,success}=useSelector((state)=>state.account)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(resetErrors())
    dispatch(resetSuccess())
  },[dispatch])

  useEffect(()=>{
    if(errors){
      setTimeout(()=>{
        dispatch(resetErrors())
      },3000)
    }
  },[errors,dispatch])

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        dispatch(resetSuccess())
      },3000)
    }
  },[success,dispatch])

  function handleSubmit(e){
    e.preventDefault()

    const valueNumber=parseFloat(value.replace('R$ ','').replace(',','.'))

    const transfer={
      code,
      value:valueNumber,
      description
    }

    dispatch(transition(transfer))

    setValue('R$ 00,00')
    setDescription('')
    setCode('0805 / ')
  }

  function handleMessage(e){
    const descriptionValue=e.target.value

    const regexDescription=/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    if(!regexDescription.test(descriptionValue) && descriptionValue!==''){
      return
    }

    if(descriptionValue.length > 100){
      return
    }

    if(descriptionValue[description.length]===' '){
      setDescription(descriptionValue)
      return
    }

    setDescription(descriptionValue)
  }

  function handleCode(e){
    const codeValue=e.target.value

    const codeStart=codeValue.substring(0,7)

    const restOfTheCode=codeValue.substring(7,14).replace('-','')

    const regexNumber=/^[0-9]+$/

    if(!regexNumber.test(restOfTheCode) && restOfTheCode!==''){
      return
    }

    if(codeValue.length<7 || restOfTheCode.length > 6){
      return
    }

    const restOfTheCodeArray=codeValue.substring(7,14).split('-')

    if(restOfTheCode.length===6){
      setCode(codeStart + restOfTheCode.substring(0,5) + '-' + restOfTheCode.substring(5,6))
      return
    }

    if(restOfTheCodeArray[1] && restOfTheCodeArray[1].length>1){
      return
    }


    setCode(codeValue)

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

      if(moneyValueFloat > 10000){
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

      if(moneyValueFloat > 10000){
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
    <div className='transfer'>
      {loading && <Loader type='Page'/>}
      {!loading &&
        <>
          <Link to='/' className='back'><AiOutlineArrowLeft/>Voltar</Link>
          <Link to='/' className='backMobile'><AiOutlineArrowRight/>Voltar</Link>
          <h1>Transferência</h1>
          {errors && <p className='errorTransfer'>Falha na transferência, confirme as informações</p>}
          {success && <p className='successTransfer'>Transferência concluída</p>}
          <form onSubmit={handleSubmit}>
            <label>
              <span>Código da conta:</span>
              <input type='text' placeholder='Digite o código da conta' value={code} onChange={handleCode}/>
            </label>
            <label>
              <span>Valor:</span>
              <input type='text' value={value} onChange={handleValue}/>
              <p className='maximumValue'>Valor máximo R$ 10.000,00</p>
            </label>
            <label>
              <span>Descrição:</span>
              <p className='characterCounterTransfer'>{description.length}/100</p>
              <textarea placeholder='Digite a descrição da transferência' value={description} onChange={handleMessage}></textarea>
            </label>
            <input type='submit' value='Enviar' />
          </form>
        
        </>
      }
    </div>
  )
}

export default Transfer