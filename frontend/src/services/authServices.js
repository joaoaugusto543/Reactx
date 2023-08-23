import api from '../api/api';

async function login(user){

    try {
        const response=await api.post('/session/',user)
    
        const data=response.data
    
        return data
        
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

const authServices={
    login
}

export default authServices