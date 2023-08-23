const { select } = require("../config/db")

async function checkUserWaiting(req,res,next){
    const {cpf}=req.body

    const {id}=req.params

    const table='userswaiting'

    let userWaiting

    if(cpf){

        const conditionCpf=`cpf = '${cpf}'`

        userWaiting=(await select(table,['id'],conditionCpf))[0]

    }

    if(id){
        const conditionId=`id = '${id}'`

        userWaiting=(await select(table,['id'],conditionId))[0]
    }

    
    if(!cpf && !id){

        const user=req.user

        const conditionId=`id = '${user.id}'`

        userWaiting=(await select(table,['id'],conditionId))[0]
    }

    if(userWaiting){
        return res.status(401).json({error:'User on hold'})
    }

    next()

    return
}

module.exports=checkUserWaiting