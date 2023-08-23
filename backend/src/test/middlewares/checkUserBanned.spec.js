const app = require('../../app')
const request=require('supertest')
const { insert, deleteLine } = require('../../config/db');
const { encryptPassword } = require('../../services/cryptography');

describe('CheckUserBanned',()=>{

    afterEach(async () => {
        await deleteLine('usersbanned')
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

    async function createUserBanned(id,idAccount,name,cpf,email,rg,phone){

        const tableUsersBanned='usersbanned'

        const newUserBanned={
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

        await insert(tableUsersBanned,newUserBanned)

        return {newUserBanned,tableUsersBanned}
    }

    it('User has been banned',async ()=>{
     
        const {account}=await createAccount('32121',100,null,null,'0805 / 19568-3')
        const {newUserBanned}=await createUserBanned('632',account.id,'Lucas','335.279.111-20','lucaas@gmail.com','42.487.898-7','(89) 2191-8504')
       
        const res=await request(app).post('/api/session/').send({cpf:newUserBanned.cpf,password:'123456'})

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User has been banned')
      
    })


})