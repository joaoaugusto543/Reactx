const { insert, select } = require("../config/db")

async function askingForCredit(req,res){
    try {

        const {value}=req.body
        
        const user=req.user

        if(!user){
            return res.status(500).json({error:'User does not exist'})
        }

        if(value > 500 || value<=0){
            return res.status(500).json({error:'Invalid value'})
        }

        const tableAskingForCredit='creditapplications'

        const conditionId=`id = '${user.id}'`

        const newAskingForCredit={...user,value}

        await insert(tableAskingForCredit,newAskingForCredit)

        const columsAskingForCredit=['id','name']

        const askingForCredit=(await select(tableAskingForCredit,columsAskingForCredit,conditionId))[0]

        return res.status(200).json(askingForCredit)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const creditControllers={
    askingForCredit
}

module.exports=creditControllers