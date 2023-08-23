import './Profile.css'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import Loader from '../../components/Loader/Loader'
import useShowCities from '../../hooks/useShowCities'
import useShowStates from '../../hooks/useShowStates'
import { useDispatch, useSelector } from 'react-redux'
import { profile, resetSuccessMessage, update } from '../../slices/userSlices'
import useErrorsUpdate from '../../hooks/useErrorsUpdate'

function Profile() {

  const {user,loading,successMessage}=useSelector((state)=>state.user)

  const dispatch=useDispatch()

  const {errorName,errorDate,errorGender,errorPhone,errorCity,errorState}=useErrorsUpdate()

  useEffect(()=>{
    dispatch(profile())
  },[dispatch])

  useEffect(()=>{
    if(successMessage){
      setTimeout(()=>{
        dispatch(resetSuccessMessage())
      },3000)
    }
  },[successMessage,dispatch])

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [birthday,setBirthday]=useState('')
  const [gender,setGender]=useState('')
  const [cpf,setCpf]=useState('')
  const [rg,setRg]=useState('')
  const [phone,setPhone]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [disabled,setDisabled]=useState(true)
  const states=useShowStates()
  const cities=useShowCities(state)

  function disabledEditForm(e){
    e.preventDefault()
    dispatch(profile())
    setDisabled(true)
  }

  function activeEditForm(e){
    e.preventDefault()
    setDisabled(false)
  }

  useEffect(()=>{
    if(user){
      setName(user.name)
      setEmail(user.email)
      setBirthday(user.birthday)
      setGender(user.gender)
      setCpf(user.cpf)
      setRg(user.rg)
      setPhone(user.phone)
      setState(user.state)
      setCity(user.city)
    }
  },[user])

  function handleSubmit(e){

    e.preventDefault()

    const updatedUser={
      name,
      email,
      birthday,
      gender,
      cpf,
      rg,
      phone,
      state,
      city
    }

    updatedUser.birthday=updatedUser.birthday.split('-').reverse().join('/')

    dispatch(update(updatedUser))   
  }

  function handlePhone(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('(').join('')

    noPunctuation=noPunctuation.split(')').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    noPunctuation=noPunctuation.split(' ').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===10 && regexNumbers.test(noPunctuation)){
      const phoneWithDot=`(${noPunctuation.substring(0,2)}) ${noPunctuation.substring(2,6)}-${noPunctuation.substring(6,10)}`
      setPhone(phoneWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setPhone(e.target.value)
    }

    if(phone.length-1>=value.length){
      setPhone(e.target.value)
      return
    }
       
    if(value.length===2){
      setPhone('(' + value + ') ')
    }

    if(value.length===9){
      setPhone(value + '-')
    }

    return
  }

  return (
    <div className='profile'>
      {loading && <Loader type='Page'/>}
      {!loading && user &&
        <>
          <h1><CgProfile/>Perfil</h1>
          {successMessage && <p className='sucessMessage'>{successMessage}</p>}
          <form className='formProfile' onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              {!disabled && <input type='text' data-testid='name' value={name} onChange={(e)=>setName(e.target.value)}/>}
              {disabled && <input type='text' data-testid='nameDisabled' disabled value={name}/>}
              {errorName && <p className='errorProfile'>{errorName}</p>}
            </label>
            <label>
              <span>E-mail:</span>
              <input type='text' data-testid='emailDisabled' disabled value={email}/>
            </label>
            <label>
              <span>Data de nascimento:</span>
                                              {/* dd/mm/yyyy ---> yyyy-mm-dd */}
              {!disabled && <input type='date' data-testid='birthday' value={birthday.split('/').reverse().join('-')} onChange={(e)=>setBirthday(e.target.value)}/>}
              {disabled && <input type='text' data-testid='birthdayDisabled' disabled value={birthday}/>}
              {errorDate && <p className='errorProfile'>{errorDate}</p>}
            </label>
            <label>
              <span>Gênero:</span>
              {!disabled && (
                <select name='gender' data-testid='gender' value={gender} onChange={(e)=>setGender(e.target.value)}>
                  <option value={gender} disabled>{gender}</option>
                  <option value='Masculino'>Masculino</option>
                  <option value='Feminino'>Feminino</option>
                  <option value='Outro'>Outro</option>
                </select>
              )}
              {disabled && <input type='text' data-testid='genderDisabled' disabled value={gender}/>}
              {errorGender && <p className='errorProfile'>{errorGender}</p>}
            </label>
            <label>
              <span>CPF:</span>
              <input type='text' data-testid='cpfDisabled' disabled value={cpf}/>
            </label>
            <label>
              <span>RG:</span>
              <input type='text' data-testid='rgDisabled' disabled value={rg}/>
            </label>
            <label>
              <span>Telefone:</span>
              {!disabled && <input type='text' data-testid='phone' value={phone} onChange={handlePhone} maxLength='14'/>}
              {disabled && <input type='text' data-testid='phoneDisabled' disabled value={phone}/>}
              {errorPhone && <p className='errorProfile'>{errorPhone}</p>}
            </label>
            <label>
              <span>Estado:</span>
              {!disabled && states && states.length!==0 && (
                <select required name='state' data-testid='states' id='state' value={state} onChange={(e)=>setState(e.target.value)}>
                  <option value={state}>{state}</option>
                  {states.map((item,index)=><option key={index} value={item.uf}>{item.uf}</option>)}
                </select>
              )}
              {disabled && <input type='text' data-testid='stateDisabled' disabled value={state}/>}
              {errorState && <p className='errorProfile'>{errorState}</p>}
            </label>
            <label>
              <span>Cidade:</span>
              {!disabled && cities && cities.length!==0 && (
                <select required name='city' data-testid='city' id='city' value={city} onChange={(e)=>setCity(e.target.value)}>
                  <option disabled value={city}>{city}</option>
                  {cities.map((item,index)=><option key={index} value={item.name}>{item.name}</option>)}
                </select>
              )}
              {disabled && <input type='text' data-testid='cityDisabled' disabled value={city}/>}
              {errorCity && <p className='errorProfile'>{errorCity}</p>}
            </label>
            <div className='buttons'>
              {disabled ? <input className='editUser' type='submit' value='Editar usuário' onClick={activeEditForm} />: <input type='submit' value='Salvar' />}
              {!disabled && <button className='closeFormEdit' onClick={disabledEditForm}>Cancelar</button>}
            </div>
          </form>
        </>
      }
    </div>
  )
}

export default Profile