const { select } = require("../config/db")

async function checkUserBanned(req,res,next){
    const {cpf}=req.body

    const {id}=req.params

    const table='usersbanned'

    let userBanned

    if(cpf){

        const conditionCpf=`cpf = '${cpf}'`

        userBanned=(await select(table,['id'],conditionCpf))[0]

    }

    if(id){
        const conditionId=`id = '${id}'`

        userBanned=(await select(table,['id'],conditionId))[0]
    }

    if(!cpf && !id){

        const user=req.user

        const conditionId=`id = '${user.id}'`

        userBanned=(await select(table,['id'],conditionId))[0]
    }

    if(userBanned){
        return res.status(401).json({error:'User has been banned'})
    }

    next()

    return
}

module.exports=checkUserBanned