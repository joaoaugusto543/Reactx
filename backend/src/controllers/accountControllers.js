const { select, update } = require('../config/db')

async function transition(req,res){
    try {

        //get values

        const {code,value,description}=req.body
        
        const userGiving=req.user

        const withdrawalAccount=req.account

        const date=new Date()

        const today=date.toLocaleDateString()

        let moneyReceived=value
        
        const tableAccount='accounts'

        const conditionCode=`code = '${code}'`

        const account=(await select(tableAccount,'*',conditionCode))[0]

        if(!withdrawalAccount || !account){
            return res.status(404).json({error:'Account not found'})
        }
        
        const tableUsers='users'
        
        const conditionIdAccount=`idaccount = '${account.id}'`
        
        const columns=['name','cpf','phone']

        const userReceiving=(await select(tableUsers,columns,conditionIdAccount))[0]
        
        if(!userGiving || !userReceiving){
            return res.status(404).json({error:'User not found'})
        }

        if(userGiving.cpf===userReceiving.cpf){
            return res.status(500).json({error:'Invalid transfer'})
        }

        if(value<=0 || typeof(value)=='string'){
            return res.status(404).json({error:'Invalid value'})
        }

        if(withdrawalAccount.total<value){
            return res.status(500).json({error:'Insufficient funds'})
        }

        let setWithdrawalAccount=''

        if(withdrawalAccount.money<value){

           const debt=(parseFloat(withdrawalAccount.money) - value) * -1

           setWithdrawalAccount=`debt = ${debt.toFixed(2)} ,` 

           if(!withdrawalAccount.debtdate){
               setWithdrawalAccount= setWithdrawalAccount + `debtdate = '${today}' ,` 
           }

        }

        const CpfCensorshipUserReceiving='***'+ '.' + userReceiving.cpf.substring(4,7) + '.' + userReceiving.cpf.substring(8,11) + '-' + '**'

        const newExtractUserGiving=[...withdrawalAccount.extrato,`#name#:#${userReceiving.name}#&#value#:#R$-${value.toFixed(2)}#&#date#:#${today}#&#CpfCensorship#:#${CpfCensorshipUserReceiving}#&#description#:#${description}#`]

        const newMoneyWithdrawalAccount=(parseFloat(withdrawalAccount.money) - value).toFixed(2)
        const newTotalWithdrawalAccount=(parseFloat(withdrawalAccount.total) - value).toFixed(2)

        setWithdrawalAccount= setWithdrawalAccount + `extrato = '{${newExtractUserGiving}}' , money = '${newMoneyWithdrawalAccount}' , total = '${newTotalWithdrawalAccount}'`

        const conditionId=`id = '${withdrawalAccount.id}'`

        await update(tableAccount,setWithdrawalAccount,conditionId)

        const accountUpdated=(await select(tableAccount,'*',conditionId))[0]

        
        //user receiving
        
        const CpfCensorshipUserGiving='***'+ '.' + userGiving.cpf.substring(4,7) + '.' + userGiving.cpf.substring(8,11) + '-' + '**'
        
        const newExtractUserReceiving=[...account.extrato,`#name#:#${userGiving.name}#&#value#:#R$${value.toFixed(2)}#&#date#:#${today}#&#CpfCensorship#:#${CpfCensorshipUserGiving}#&#description#:#${description}#`]
            
        if(account.debt){

            const nameBank='Banco Reactx'
            const descriptionBank='Taxa de crédito.'
                
            if(value < account.debt){
                    
                moneyReceived=0
       
                newExtractUserReceiving.push(`#name#:#${nameBank}#&#value#:#R$-${value.toFixed(2)}#&#date#:#${today}#&#CpfCensorship#:#none#&#description#:#${descriptionBank}#`)
        
                const newDebt=(parseFloat(account.debt) - value)
                const newMoneyReceived=(parseFloat(account.money) + value).toFixed(2)
                const newTotalReceived=(parseFloat(account.total) + value).toFixed(2)

                const set=`debt = '${newDebt.toFixed(2)}' , extrato = '{${newExtractUserReceiving}}' , money = '${newMoneyReceived}' , total = '${newTotalReceived}'`
        
                await update(tableAccount,set,conditionCode)

                const withdrawalAccountUpdated=(await select(tableAccount,'*',conditionCode))[0]
        
                return res.status(200).json({withdrawalAccountUpdated,accountUpdated})
        
            }else{
                    
                moneyReceived-=account.debt

                let newTotalReceived

                if(account.debt + account.total !==account.credit){

                    newTotalReceived=(parseFloat(account.credit) + moneyReceived)

                }else{

                    newTotalReceived=(parseFloat(account.total) + moneyReceived + account.debt)

                }

                newTotalReceived=parseFloat(newTotalReceived).toFixed(2)

                newExtractUserReceiving.push(`#name#:#${nameBank}#&#value#:#R$-${account.debt}#&#date#:#${today}#&#CpfCensorship#:#none#&#description#:#${descriptionBank}#`)

                const newMoneyReceived=parseFloat(moneyReceived).toFixed(2)

                const set=`debt = null , extrato = '{${newExtractUserReceiving}}' , money = '${newMoneyReceived}' , total = '${newTotalReceived}' , debtdate = null`
                    
                await update(tableAccount,set,conditionCode)
                    
                const withdrawalAccountUpdated=(await select(tableAccount,'*',conditionCode))[0]
        
                return res.status(200).json({withdrawalAccountUpdated,accountUpdated})
            }
                    
        }

        const newMoneyReceived=(parseFloat(account.money) + moneyReceived).toFixed(2)
        const newTotalReceived=(parseFloat(account.total) + value).toFixed(2)
                    
        const set=`extrato = '{${newExtractUserReceiving}}' , money = '${newMoneyReceived}' , total = '${newTotalReceived}'`
                    
        await update(tableAccount,set,conditionCode)

        const withdrawalAccountUpdated=(await select(tableAccount,'*',conditionCode))[0]
        
        return res.status(200).json({withdrawalAccountUpdated,accountUpdated})
                
                    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function clearExtract(req,res){
    try {
        const account=req.account

        if(!account){
            return res.status(404).json({error:'Account not found'})
        }

        const table='accounts'

        const conditionId=`id = '${account.id}'`

        const set=`extrato='{}'`

        await update(table,set,conditionId)

        const updatedAccount=(await select(table,['extrato'],conditionId))[0]

        return res.status(200).json(updatedAccount)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function checkDebt(req,res){
    try {

        const account=req.account

        const date=new Date()

        const today=date.toLocaleDateString()

        if(!account){
            return res.status(404).json({error:'Account not found'})
        }

        if(!account.debt && !account.debtdate){
            return res.status(200).json({success:'No debt',debt:null})
        }

        if(account.debtdate === today){
            return res.status(200).json({success:'No fee',debt:account.debt})
        }

        const todayDate  = today.split('/').reverse().join('-')
        const debtdate  = account.debtdate.split('/').reverse().join('-')

        const differenceOfMonths   = (new Date(debtdate) - new Date(todayDate)) * -1

        const differenceOfDays = differenceOfMonths / (1000 * 60 * 60 * 24)

        let debt=parseFloat(account.debt)

        console.log(differenceOfDays)

        for(let i=0;i<differenceOfDays;i++){
            debt+=debt * 0.008
        }

        debt=debt.toFixed(2)

        const table='accounts'

        const conditionId=`id = '${account.id}'`

        const set=`debt = '${debt}',debtdate='${today}'`

        await update(table,set,conditionId)

        return res.status(200).json({debt:debt})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

function getAccount(req,res){
    try {
        const account=req.account

        if(!account){
            return res.status(404).json({error:'Account not found'})
        }

        return res.status(200).json(account)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}


const accountControllers={
    transition,
    clearExtract,
    checkDebt,
    getAccount
}

module.exports=accountControllers