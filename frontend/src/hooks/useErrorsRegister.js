import { useSelector } from 'react-redux'

function useErrorsRegister() {

  const {errors}=useSelector((state)=>state.userWaiting)

  const errorsRegister={}
  
  if(!errors){
    return errorsRegister
  }

  if(errors.includes('Invalid CPF')){
    errorsRegister.errorCpf='CPF inválido.'
  }

  if(errors.includes('Minors cannot create a checking account')){
    errorsRegister.errorDate='Menor de idade.'
  }

  if(errors.includes('Invalid date')){
    errorsRegister.errorDate='Data inválida.'
  }

  if(errors.includes('Password must be at least 6 characters long')){
    errorsRegister.errorPassword='A senha precisa ter 6 caracteres.'
  }

  if(errors.includes('Invalid gender')){
    errorsRegister.errorGender='Selecione um gênero válido.'
  }

  if(errors.includes('Invalid phone')){
    errorsRegister.errorPhone='Telefone inválido'
  }

  if(errors.includes('Invalid RG')){
    errorsRegister.errorRg='RG inválido'
  }

  if(errors.includes('Invalid state')){
    errorsRegister.errorState='Estado inválido'
  }

  if(errors.includes('Invalid city')){
    errorsRegister.errorCity='Cidade inválida'
  }

  if(errors.includes('The name must be at least three characters long')){
    errorsRegister.errorName='Nome inválido.'
  }

  if(errors.includes('Invalid email')){
    errorsRegister.errorEmail='e-mail inválido'
  }

  if(errors.includes('Passwords need to be the same')){
    errorsRegister.errorConfirmPassword='As senhas precisam ser iguais'
  }

  return errorsRegister

}

export default useErrorsRegister