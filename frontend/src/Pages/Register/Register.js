import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import {useEffect, useState} from 'react'
import useShowStates from '../../hooks/useShowStates'
import useShowCities from '../../hooks/useShowCities'
import { useDispatch, useSelector } from 'react-redux'
import useErrorsRegister from '../../hooks/useErrorsRegister'
import {AiFillEye,AiFillEyeInvisible, AiOutlineArrowUp} from 'react-icons/ai'
import { createUserWaiting } from '../../slices/usersWaitingSlices'

function Register() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [cpf,setCpf]=useState('')
  const [rg,setRg]=useState('')
  const [birthday,setBirthday]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [gender,setGender]=useState('')
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)

  const {loading,success}=useSelector((state)=>state.userWaiting)

  const dispatch=useDispatch()

  const navigate=useNavigate()

  const {errorCpf,errorDate,errorPassword,errorGender,errorPhone,errorRg,errorState,errorCity,errorName,errorEmail,invalidCode,errorConfirmPassword}=useErrorsRegister()

  const states=useShowStates()

  const cities=useShowCities(state)

  useEffect(()=>{
    if(success){
      navigate('/waiting')
    }
  },[success,navigate])

  async function handleSubmit(e){

    e.preventDefault()

    const newUser={
      name,
      email,
      password,
      confirmPassword,
      phone,
      cpf,
      rg,
      birthday,
      state,
      city,
      gender
    }

    // yyy-mm-dd

    newUser.birthday=newUser.birthday.split('-').reverse().join('/')

    // dd/mm/yyyy

    dispatch(createUserWaiting(newUser))

  
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

  function handleRg(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('.').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===9 && (value.indexOf('.')===-1 || value.indexOf('-')===-1)){
      const rgWithDot=`${noPunctuation.substring(0,2)}.${noPunctuation.substring(2,5)}.${noPunctuation.substring(5,8)}-${noPunctuation.substring(8,10)}`
      setRg(rgWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setRg(e.target.value)
    }

    if(rg.length-1>=value.length){
      setRg(e.target.value)
      return
    }
       
    if(value.length===2 || value.length===6){
      setRg(value + '.')
    }

    if(value.length===10){
      setRg(value + '-')
    }

    return

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
    <div className='register'>
        <section className='bannerRegister'>
          <img src='https://images.unsplash.com/photo-1518087456308-c3976320f908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' alt='mulher sorrindo' />
        </section>
        <div className='registerForm'>
          <h1>Reactx</h1>
          {invalidCode && <p className='errorCode'>{invalidCode}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome completo:</span>
              <input required type='name' placeholder='Digite seu nome.' value={name} onChange={(e)=>setName(e.target.value)} />
              {errorName && <p className='error'>{errorName}</p>}
            </label>
            <label>
              <span>E-mail:</span>
              <input required type='email' placeholder='Digite seu e-mail.' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {errorEmail && <p className='error'>{errorEmail}</p>}
            </label>
            <label className='password'>
              <span>Senha:</span>
              <input required type={!showPassword ? 'password' : 'text'} placeholder='Digite sua senha.' value={password} onChange={(e)=>setPassword(e.target.value)} />
              {errorPassword && <p className='error'>{errorPassword}</p>}
              {!showPassword ? <AiFillEye onClick={()=>setShowPassword(true)}/> : <AiFillEyeInvisible onClick={()=>setShowPassword(false)}/>}
            </label>
            <label className='confirmPassword'>
              <span>Confirme sua senha:</span>
              <input required type={!showConfirmPassword ? 'password' : 'text'} placeholder='Digite sua senha.' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
              {errorConfirmPassword && <p className='error'>{errorConfirmPassword}</p>}
              {!showConfirmPassword ? <AiFillEye onClick={()=>setShowConfirmPassword(true)}/> : <AiFillEyeInvisible onClick={()=>setShowConfirmPassword(false)}/>}
            </label>
            <label>
              <span>Telefone:</span>
              <input required type='tel' placeholder='Digite seu telefone.' value={phone} onChange={handlePhone} maxLength='14'/>
              {errorPhone && <p className='error'>{errorPhone}</p>}
            </label>
            <label>
              <span>CPF:</span>
              <input required type='text' placeholder='Digite seu CPF.' value={cpf} onChange={handleCpf} maxLength='14'/>
              {errorCpf && <p className='error'>{errorCpf}</p>}
            </label>
            <label>
              <span>RG:</span>
              <input required type='text' placeholder='Digite seu RG.' value={rg} onChange={handleRg} maxLength='12'/>
              {errorRg && <p className='error'>{errorRg}</p>}
            </label>
            <label>
              <span>Data de nascimento:</span>
              <input required type='date' value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
              {errorDate && <p className='error'>{errorDate}</p>}
            </label>
            <label>
              <span>Estado</span>
              <select required name='state' id='state' value={state} onChange={(e)=>setState(e.target.value)}>
                <option >Selecione seu Estado</option>
                {states && states.length!==0 && states.map((item,index)=><option key={index} value={item.uf}>{item.uf}</option>)}
              </select>
              {errorState && <p className='error'>{errorState}</p>}
            </label>
            <label>
              <span>Cidade:</span>
              <select required name='city' id='city' value={city} onChange={(e)=>setCity(e.target.value)}>
                <option >Selecione sua cidade</option>
                {cities && cities.length!==0 && cities.map((item,index)=><option key={index} value={item.name}>{item.name}</option>)}
              </select>
              {errorCity && <p className='error'>{errorCity}</p>}
            </label>
            <label id='lastSelect'>
              <span>Gênero</span>
              <select required name='gender' value={gender} id='gender' onChange={(e)=>setGender(e.target.value)}>
                <option name='gender'>Selecione seu gênero</option>
                <option name='gender' value='Masculino'>Masculino</option>
                <option name='gender' value='Feminino'>Feminino</option>
                <option name='gender' value='Outro'>Outro</option>
              </select>
              {errorGender && <p className='error'>{errorGender}</p>}
            </label>
            <p className='linkSupport'>Algum problema? <Link to='/support'>Suporte</Link></p>
            {!loading ? <input type='submit' value='Cadastrar' /> : <button className='disabledButton' disabled>Aguarde...</button> }
          </form>
          <p className='dragUpRegister'>Arrasta pra cima<AiOutlineArrowUp/></p>
          <p className='haveAnAccount'>Tem uma conta? <Link to='/login'>Conecte-se</Link></p>
        </div>
    </div>
  )
}

export default Register

