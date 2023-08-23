const { update, select, deleteLine } = require("../config/db")
const { encryptPassword } = require("../services/cryptography")

async function updateUser(req,res){
    try {

        const {name,newPassword,phone,birthday,gender,state,city}=req.body

        const user=req.user

        if(!user){
            return res.status(500).json({error:'User does not exist'})
        }
        
        if(newPassword){
            user.password=await encryptPassword(newPassword)
        }

        if(name){
            user.name=name
        }

        if(phone){
            user.phone=phone
        }

        if(birthday){
            user.birthday=birthday
        }

        if(gender){
            user.gender=gender
        }

        if(city){
            user.city=city
        }

        if(state){
            user.state=state
        }


        const table='users'

        const columns=['id','name','email','cpf','rg','birthday','gender','city','state']

        const conditionId=`id = '${user.id}'`

        const set=` name = '${user.name}' , password = '${user.password}' , phone = '${user.phone}' , birthday = '${user.birthday}' , gender = '${user.gender}' ,city = '${user.city}' , state = '${user.state}'`

        await update(table,set,conditionId)

        const updatedUser=(await select(table,columns,conditionId))[0]

        return res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function profile(req,res){
    try {

        const user=req.user

        if(!user){
            return res.status(404).json({error:'User not found'})
        }

        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'}) 
    }
}

async function deleteUser(req,res){
    try {

        const user=req.user

        if(!user){
            return res.status(404).json({error:'User not found'})
        }

        //delete user

        const tableUsers='users'

        const conditionIdUser=`id = '${user.id}'`

        await deleteLine(tableUsers,conditionIdUser)

        //delete account

        const tableAccounts='accounts'

        const conditionIdAccount=`id = '${user.idaccount}'`

        await deleteLine(tableAccounts,conditionIdAccount)

        return res.status(200).json({sucess:'User deleted'})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'}) 
    }
}

const userController={
    updateUser,
    profile,
    deleteUser
}

module.exports=userController