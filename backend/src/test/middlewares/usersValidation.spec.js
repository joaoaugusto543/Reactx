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

async function login(cpf,password){
        
    const res=await request(app).post('/api/session/').send({cpf,password})

    token=`Bearer ${res.body.token}`

    return token
}

describe('UsersValidation',()=>{

    afterEach(async () => {
        await deleteLine('users')
        await deleteLine('accounts')
    })
    
    it('Validation',async ()=>{
        
        const {account}=await createAccount('23121',100,null,null,'0805 / 75696-3')
        const {newUser}=await createUser('12311',account.id,'Lucas','366.458.231-42','lopesss@gmail.com','11.098.273-3','(24) 3078-8886')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).put('/api/user/').send({name:'l'}).set('Authorization',token)

        const body=res.body

        expect(body).toHaveProperty('errors')
    })

})