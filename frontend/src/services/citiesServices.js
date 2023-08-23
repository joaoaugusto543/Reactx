import api from '../api/api'

async function showCities(){
    try {
        const response=await api.get(`/cities/`)
        const cities=response.data
        return cities
        
    } catch (error) {
        console.log(error)
        return error.data
    }
}

const citiesServices={
    showCities
}

export default citiesServices