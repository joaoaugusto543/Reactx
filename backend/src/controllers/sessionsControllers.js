require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const  {select}=require('../config/db')
const { verifyPassword }=require('../services/cryptography')
const jwt=require('jsonwebtoken')

async function create(req,res){
    try {

        const {cpf,password}=req.body

        const tableUsers='users'
    
        const conditionCpf=`cpf = '${cpf}'`
        const columns=['id','name','idaccount','password']

        const user=(await select(tableUsers,columns,conditionCpf))[0]

        if(!user){       
            return res.status(401).json({authenticationError:'user / password invalid'})
        }

        
        if(!await verifyPassword(user,password)){
            return res.status(401).json({authenticationError:'user / password invalid'})
        }
        
        const {id,name,idaccount}=user
                
        const secret=process.env.TOKEN_SECRET

        return res.status(200).json(
            {
                user:{
                    id,
                    name,
                    idaccount
                },
                token:jwt.sign({id},secret,{
                    expiresIn:'7d'
                })
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const sessionsControllers={
    create
}

module.exports=sessionsControllers