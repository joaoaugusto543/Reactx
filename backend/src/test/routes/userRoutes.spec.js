const app = require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')
const request=require('supertest')

const baseUrl='/api/user'

describe('userRoutes',()=>{

    afterEach(async () => {
        await deleteLine('users')
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


    it('Profile',async ()=>{

        const {account}=await createAccount('43543',100,null,null,'0805 / 75696-3')
        const {newUser}=await createUser('5443',account.id,'Lucas','139.979.178-84','lopesssss@gmail.com','34.414.023-1','(33) 2083-8177')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).get(`${baseUrl}/`).send({value:200}).set('Authorization',token)

        const user=res.body
    
        expect(user).not.toBeUndefined()
        expect(user.cpf).toBe(newUser.cpf)

    })

    it('DeleteUser',async ()=>{

        const {account}=await createAccount('43543',100,null,null,'0805 / 75696-3')
        const {newUser}=await createUser('5443',account.id,'Lucas','366.458.231-42','lopesss@gmail.com','11.098.273-3','(24) 3078-8886')

        const token=await login(newUser.cpf,'123456')

        const table='users'

        const conditionRg=`rg = '${newUser.rg}'`

        const userBeforeDeleting=(await select(table,['cpf'],conditionRg))[0]

        await request(app).delete(`${baseUrl}/`).set('Authorization',token)

        const userAfterDelete=(await select(table,['cpf'],conditionRg))[0]

        expect(userBeforeDeleting).not.toBeUndefined()
        expect(userAfterDelete).toBeUndefined()

    })

    it('UpdateUser',async ()=>{

        const {account}=await createAccount('43543',100,null,null,'0805 / 75696-3')
        const {newUser}=await createUser('5443',account.id,'Lucas','366.458.231-42','lopesss@gmail.com','11.098.273-3','(24) 3078-8886')

        const token=await login(newUser.cpf,'123456')

        const table='users'

        const conditionRg=`rg = '${newUser.rg}'`

        const userBeforeUpdate=(await select(table,['name'],conditionRg))[0]

        await request(app).put(`${baseUrl}/`).send({name:'João'}).set('Authorization',token)

        const userAfterUpdate=(await select(table,['name'],conditionRg))[0]

        expect(userBeforeUpdate.name).not.toBe(userAfterUpdate.name)
        expect(userAfterUpdate.name).toBe('João')

    })

})