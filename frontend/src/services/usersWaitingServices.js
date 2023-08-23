import api from '../api/api'

async function createUserWaiting(newUserWaitng){
    try {
        const response=await api.post('/userWaiting/',newUserWaitng)
        const userWaiting=response.data
        return userWaiting
        
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
const usersWaitingServices={
    createUserWaiting
}

export default usersWaitingServices