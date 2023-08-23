import api from '../api/api'

async function showStates(){
    try {
        const response=await api.get(`/states/`)
        const states=response.data
        return states
        
    } catch (error) {
        console.log(error)
        return error.data
    }
}

const statesServices={
    showStates
}

export default statesServices