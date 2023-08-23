import api from '../api/api'

async function getAccount(){
    try {
        const response=await api.get('accounts/')

        const data=response.data

        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

async function transition(transition){
    try {

        const response=await api.post('accounts/',transition)
        
        const data=response.data

        return data

    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

async function clearExtract(){
    try {
        const response=await api.put('accounts/')
        
        const data=response.data

        return data 

    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

async function checkDebt(){
    try {
        const response=await api.put('accounts/check')
        
        const data=response.data

        return data 

    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

const accountServices={
    getAccount,
    transition,
    clearExtract,
    checkDebt
}

export default accountServices