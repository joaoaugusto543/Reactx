const {select} = require('../config/db')

async function showCities(req,res){
    try {

        const table='cities'
        const columns=['name','uf']

        const cities=await select(table,columns)

        return res.status(200).json(cities)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const citiesControllers={
    showCities
}

module.exports=citiesControllers