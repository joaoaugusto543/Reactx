import api from '../api/api';

async function support(support){
    try {
        const response=await api.post('support/',support)

        const data=response.data

        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

const supportServices={
    support
}

export default supportServices