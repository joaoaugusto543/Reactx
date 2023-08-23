import api from '../api/api';

async function askingForCredit(credit){
    try {

        const response=await api.post('credit/',credit)
        const data=response.data
        return data

    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

const creditServices={
    askingForCredit
}

export default creditServices