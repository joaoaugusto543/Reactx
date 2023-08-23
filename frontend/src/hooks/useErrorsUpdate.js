import { useSelector } from 'react-redux'

function useErrorsUpdate() {

  const {errors}=useSelector((state)=>state.user)

  const errorsUpdate={}
    
  if(!errors){
    return errorsUpdate
  }

  if(errors.includes('Minors cannot create a checking account')){
    errorsUpdate.errorDate='Menor de idade.'
  }

  if(errors.includes('Invalid date')){
    errorsUpdate.errorDate='Data inválida.'
  }

  if(errors.includes('Invalid gender')){
    errorsUpdate.errorGender='Selecione um gênero válido.'
  }

  if(errors.includes('Invalid phone')){
    errorsUpdate.errorPhone='Telefone inválido'
  }

  if(errors.includes('Invalid state')){
    errorsUpdate.errorState='Estado inválido'
  }

  if(errors.includes('Invalid city')){
    errorsUpdate.errorCity='Cidade inválida'
  }

  if(errors.includes('The name must be at least three characters long')){
    errorsUpdate.errorName='Nome inválido.'
  }

  if(errors.includes('Passwords need to be the same') || errors.includes('Incorrect password') || errors.includes('Password must be at least 6 characters long')){
    errorsUpdate.errorPassword='Ocorreu um erro, verifique as informações inseridas.'
  }

  return errorsUpdate

}

export default useErrorsUpdate