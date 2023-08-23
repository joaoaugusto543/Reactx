const app = require('../../app')
const { deleteLine, select } = require('../../config/db')
const request=require('supertest')

const baseUrl='/api/userwaiting'

describe('UserWaitingRoutes',()=>{

    afterEach(async () => {
        await deleteLine('userswaiting')
    });

    it('Create user waiting',async ()=>{

        const newUserWaiting={
            name: 'Lopes',
            email: 'lopes@gmail.com',
            password: '1234567',
            confirmPassword:'1234567',
            phone:'(99) 2225-5496',
            cpf: '708.880.755-61',
            birthday: '29/12/2004',
            gender: 'Masculino',
            rg:'20.171.237-4',
            state:'RS',
            city:'Taquara'
        
        }

        await request(app).post(`${baseUrl}/`).send(newUserWaiting)
        
        const table='userswaiting'

        const conditionRg=`rg = '${newUserWaiting.rg}'`

        const userWaiting=(await select(table,['cpf'],conditionRg))[0]

        expect(userWaiting).not.toBeUndefined()
        expect(userWaiting.cpf).toBe(newUserWaiting.cpf)

    })

})