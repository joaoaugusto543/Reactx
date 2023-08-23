require('dotenv').config({
    path: process.env.NODE_ENV.trim() !== 'test' ?  '.env.testing' : '.env'
})

const {promisify}=require('util')
const jwt=require('jsonwebtoken')
const { select } = require('../config/db')

async function auth(req,res,next){
    const authHeader=req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:'Token was not provided'})
    }

    const [,token]=authHeader.split(' ')

    try {

        const secret=process.env.TOKEN_SECRET

        const decoded=await promisify(jwt.verify)(token,secret)

        const table='users'
        const conditionId=`id = '${decoded.id}'`

        const columns=['id','birthday','city','cpf','email','gender','idaccount','name','phone','rg','state','password']

        const user=(await select(table,columns,conditionId))[0]

        const tableAccounts='accounts'

        const conditionIdAccount=`id = '${user.idaccount}'`

        const account=(await select(tableAccounts,'*',conditionIdAccount))[0]

        req.user=user

        req.account=account

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Invalid token'})
    }


}

module.exports=auth