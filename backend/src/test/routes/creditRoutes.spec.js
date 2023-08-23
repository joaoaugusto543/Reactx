const app = require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')
const request=require('supertest')

const baseUrl='/api/credit'

describe('CreditRoutes',()=>{

    afterEach(async () => {
        await deleteLine('users')
        await deleteLine('creditapplications')
        await deleteLine('accounts')
    });

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

    async function login(cpf,password){
        
        const res=await request(app).post('/api/session/').send({cpf,password})

        token=`Bearer ${res.body.token}`

        return token
    }


    it('AskingForCredit',async ()=>{

        const {account}=await createAccount('43754',100,null,null,'0805 / 45696-3')
        const {newUser}=await createUser('1232',account.id,'Lucas','139.979.178-84','lopesssss@gmail.com','34.414.023-1','(33) 2083-8177')

        const token=await login(newUser.cpf,'123456')

        await request(app).post(`${baseUrl}/`).send({value:200}).set('Authorization',token)

        const table='creditapplications'

        const conditionId=`id = '${newUser.id}'`

        const credit=(await select(table,['cpf'],conditionId))[0]

        expect(credit).not.toBeUndefined()
        expect(credit.cpf).toBe(newUser.cpf)

    })

    it('Invalid value askingForCredit',async ()=>{

        const {account}=await createAccount('43754',100,null,null,'0805 / 45696-3')
        const {newUser}=await createUser('1232',account.id,'Lucas','139.979.178-84','lopesssss@gmail.com','34.414.023-1','(33) 2083-8177')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).post(`${baseUrl}/`).send({value:600}).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('Invalid value')
        
    })

})