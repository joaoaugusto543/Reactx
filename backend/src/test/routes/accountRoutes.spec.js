const app = require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')
const request=require('supertest')

const baseUrl='/api/accounts'

const date=new Date()

const today=date.toLocaleDateString()

describe('AccountRoutes',()=>{

    afterEach(async () => {
        await deleteLine('users')
        await deleteLine('accounts')
    })

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


    it('Transition',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:50,
            description:'Paguei o lanche.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {withdrawalAccountUpdated,accountUpdated}=res.body


        expect(paymentAccount.money-50).toBe(accountUpdated.money)
        expect(receiptAccount.money+50).toBe(withdrawalAccountUpdated.money)

        expect(accountUpdated.extrato.includes(`#name#:#Marcos#&#value#:#R$-50#&#date#:#${today}#&#CpfCensorship#:#***.611.273-**#&#description#:#Paguei o lanche.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Lucas#&#value#:#R$50#&#date#:#${today}#&#CpfCensorship#:#***.279.111-**#&#description#:#Paguei o lanche.#`)).toBeTruthy()
        

    })

    it('Error Account not found transition',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(payingUser.cpf,'123456')

        const res=await request(app).post(`${baseUrl}/`).send({code:'123'}).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('Account not found')
        
    })

    it('Error User not found transition',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(payingUser.cpf,'123456')

        const res=await request(app).post(`${baseUrl}/`).send({code:receiptAccount.code}).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('User not found')
        
    })

    it('Error Invalid value transition',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:-100,
            description:'Paguei o lanche.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('Invalid value')

    })

    it('Error Insufficient funds transition',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:100000000,
            description:'Comprando jao.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('Insufficient funds')
    })

    it('Transition test that will generate debt, but the account has no outstanding debts',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:120,
            description:'Pagando o churrasco.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {accountUpdated}=res.body

        expect(accountUpdated.debtdate).not.toBeNull()
        expect(accountUpdated.debtdate).toBe(today)
        expect(accountUpdated.debt).not.toBeNull()
        expect(accountUpdated.debt).toBe(20)

    })

    it('Transition test that will generate debt, but the account has outstanding debts',async ()=>{

        const {account:paymentAccount}=await createAccount('456',-20,20,'01/01/2023','0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:120,
            description:'Pagando o churrasco.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {accountUpdated}=res.body

        expect(accountUpdated.debtdate).not.toBeNull()
        expect(accountUpdated.debtdate).toBe('01/01/2023')
        expect(accountUpdated.debt).not.toBeNull()
        expect(accountUpdated.debt).toBe(140)

    })

    it('The receiving user has a debt greater than or equal to the transferred amount',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,100,'01/01/2023','0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:90,
            description:'Comprando jato.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {withdrawalAccountUpdated}=res.body

        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Banco Reactx#&#value#:#R$-90#&#date#:#${today}#&#CpfCensorship#:#none#&#description#:#Taxa de crédito.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Lucas#&#value#:#R$90#&#date#:#${today}#&#CpfCensorship#:#***.279.111-**#&#description#:#Comprando jato.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.money).toBe(receiptAccount.money)
        expect(withdrawalAccountUpdated.debt).toBe(10)
        expect(withdrawalAccountUpdated.debtdate).toBe('01/01/2023')
    
    })

    it('The receiving user has a debt less than the amount transferred',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,100,'01/01/2023','0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:150,
            description:'Comprando jato.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {withdrawalAccountUpdated}=res.body

        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Banco Reactx#&#value#:#R$-100#&#date#:#${today}#&#CpfCensorship#:#none#&#description#:#Taxa de crédito.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Lucas#&#value#:#R$150#&#date#:#${today}#&#CpfCensorship#:#***.279.111-**#&#description#:#Comprando jato.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.money).toBe(receiptAccount.money + 50)
        expect(withdrawalAccountUpdated.debt).toBeNull()
        expect(withdrawalAccountUpdated.debtdate).toBeNull()
    
    })

    it('The receiving user has a debt less than the amount transferred',async ()=>{

        const {account:paymentAccount}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19543-3',
            value:150,
            description:'Roubando.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {error}=res.body

        expect(error).toBe('Invalid transfer')

    
    })

    it('ClearExtract',async ()=>{

        const {account:paymentAccount,tableAccounts}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {account:receiptAccount}=await createAccount('543',100,null,null,'0805 / 19534-3')
        const {newUser:payingUser}=await createUser('632',paymentAccount.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')
        await createUser('4354',receiptAccount.id,'Marcos','419.611.273-00','lopees@gmail.com','26.092.278-6','(63) 3473-9725')

        const token=await login(payingUser.cpf,'123456')

        const transition={
            code:'0805 / 19534-3',
            value:50,
            description:'Paguei o lanche.'
        }

        const res=await request(app).post(`${baseUrl}/`).send(transition).set('Authorization',token)

        const {withdrawalAccountUpdated,accountUpdated}=res.body

        expect(paymentAccount.money-50).toBe(accountUpdated.money)
        expect(receiptAccount.money+50).toBe(withdrawalAccountUpdated.money)
        
        expect(accountUpdated.extrato.includes(`#name#:#Marcos#&#value#:#R$-50#&#date#:#${today}#&#CpfCensorship#:#***.611.273-**#&#description#:#Paguei o lanche.#`)).toBeTruthy()
        expect(withdrawalAccountUpdated.extrato.includes(`#name#:#Lucas#&#value#:#R$50#&#date#:#${today}#&#CpfCensorship#:#***.279.111-**#&#description#:#Paguei o lanche.#`)).toBeTruthy()
        
        await request(app).put(`${baseUrl}/`).set('Authorization',token)

        const conditionId=`id = '${accountUpdated.id}'`

        const accountWithCleanStatement=(await select(tableAccounts,['extrato'],conditionId))[0]

        expect(accountWithCleanStatement.extrato).toHaveLength(0)

    })

    it('CheckDebt',async ()=>{

        const previousDate=new Date()

        previousDate.setDate(previousDate.getDate() - 5)

        const daysBefore=previousDate.toLocaleDateString()

        const {account,tableAccounts}=await createAccount('456',100,100,daysBefore,'0805 / 19543-3')
        const {newUser}=await createUser('632',account.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(newUser.cpf,'123456')

        await request(app).put(`${baseUrl}/check`).set('Authorization',token)

        const conditionId=`id = '${account.id}'`

        const accountAfterTax=(await select(tableAccounts,['debt'],conditionId))[0]

        expect(account.debt).not.toBe(accountAfterTax.debt)
        expect(accountAfterTax.debt).toBe(104.06)

        
    })

    it('CheckDebt No debt',async ()=>{

        const {account}=await createAccount('456',100,null,null,'0805 / 19543-3')
        const {newUser}=await createUser('632',account.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).put(`${baseUrl}/check`).set('Authorization',token)

        const {success}=res.body

        expect(success).toBe('No debt')

    })

    it('CheckDebt No fee',async ()=>{

        const {account}=await createAccount('456',100,10,today,'0805 / 19543-3')
        const {newUser}=await createUser('632',account.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).put(`${baseUrl}/check`).set('Authorization',token)

        const {success}=res.body

        expect(success).toBe('No fee')

    })

    it('GetAccount',async ()=>{

        const {account}=await createAccount('456',100,10,today,'0805 / 19543-3')
        const {newUser}=await createUser('632',account.id,'Lucas','335.279.111-20','lopes@gmail.com','42.487.898-7','(89) 2191-8504')

        const token=await login(newUser.cpf,'123456')

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        const accountBody=res.body

        expect(accountBody.code).toBe(account.code)

    })




})