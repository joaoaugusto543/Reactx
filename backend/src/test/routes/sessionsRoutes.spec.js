const { insert, deleteLine } = require('../../config/db')
const app = require('../../app')
const request=require('supertest')
const { encryptPassword } = require('../../services/cryptography')

async function createUser(id,idAccount,name,cpf,email,rg,phone){

    const tableUsers='users'

    const newUser={
        id,
        password:await encryptPassword('123456'),
        name,
        email,
        cpf,
        rg,
        phone,
        birthday:'23/02/1943',
        gender:'Masculino',
        state: 'PR',
        city: 'Pinhais',
        idaccount:idAccount
    }

    await insert(tableUsers,newUser)

    return {newUser,tableUsers}
}

async function createAccount(id,money,debt,debtDate,code){

    const tableAccounts='accounts'

    const account={
        id,
        code,
        extrato:[],
        credit:200,
        money,
        debt,
        debtdate:debtDate,
        total:money + 200
    }

    await insert(tableAccounts,account)

    return {account,tableAccounts}

}

describe('SessionsRoutes',()=>{
    
    it('Create session',async ()=>{
        
        const {account}=await createAccount('5332',100,null,null,'0805 / 19536-3')
        const {newUser,tableUsers}=await createUser('632',account.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
       
        const res=await request(app).post('/api/session/').send({cpf:newUser.cpf,password:'123456'})

        const conditionId=`id = '${newUser.id}'`

        deleteLine(tableUsers,conditionId)

        const body=res.body

        expect(body).toHaveProperty('user')
        expect(body).toHaveProperty('token')
      
    })

    it('Error user / password invalid create session',async ()=>{
       
        const res=await request(app).post('/api/session/').send({cpf:'123',password:'123456'})

        const body=res.body

        expect(body).toHaveProperty('authenticationError')
        expect(body.authenticationError).toBe('user / password invalid')
      
    })
})