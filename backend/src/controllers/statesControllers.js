const {select} = require('../config/db')

async function showStates(req,res){
    try {

        const table='states'
        const columns=['uf']

        const states=await select(table,columns)

        return res.status(200).json(states)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const statesControllers={
    showStates
}

module.exports=statesControllers