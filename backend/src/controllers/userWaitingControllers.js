const { select, insert } = require('../config/db')
const {encryptPassword}=require('../services/cryptography')
const { v4: uuidv4 } = require('uuid')

async function createUserWaiting(req,res){
    try {
        const {name,email,password,cpf,phone,birthday,gender,rg,state,city}=req.body

        //check if user already exists

        const tableUsers='users'
        
        const columns=['id','name','email','cpf','rg','birthday','gender','city','state']
        
        const conditionCpfOrEmail=` cpf = '${cpf}' OR email = '${email}' OR phone = '${phone}'`
        
        const user=(await select(tableUsers,columns,conditionCpfOrEmail))[0]
        
        if(user){
            return res.status(500).json({error:'User already exists'})
        }

        //create user waiting

        const id=uuidv4()
        
        const tableUsersWaiting='userswaiting'

        const encryptedPassword=await encryptPassword(password)

        const userWaiting={
            id,
            name,
            email,
            password:encryptedPassword,
            cpf,
            phone,
            birthday,
            gender,
            rg,
            state,
            city
        }


        await insert(tableUsersWaiting, userWaiting)

        const conditionId=`id = '${id}'`

        const newUserWaiting=(await select(tableUsersWaiting,columns,conditionId))[0]

        return res.status(200).json(newUserWaiting)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const userWaitingControllers={
    createUserWaiting
}

module.exports=userWaitingControllers
