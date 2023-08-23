import api from '../api/api';

async function profile(){
    try {
        const response=await api.get('user/')

        const data=response.data

        return data

    } catch (error) {

        console.log(error)
        return error.response.data

    }
}

async function update(user){
    try {
        const response=await api.put('user/',user)

        const data=response.data

        return data

    } catch (error) {
        console.log(error)
        return error.response.data

    }
}

const userServices={
    profile,
    update
}

export default userServices