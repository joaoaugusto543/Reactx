const app = require('../../app')
const request=require('supertest')
const { insert, deleteLine } = require('../../config/db');
const { encryptPassword } = require('../../services/cryptography');

describe('CheckUserWaiting.spec',()=>{

    afterEach(async () => {
        await deleteLine('userswaiting')
    });

    async function createUserWaiting(id,name,cpf,email,rg,phone){

        const tableUsersWaiting='userswaiting'

        const newUserWaiting={
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
            city: 'Pinhais'
        }

        await insert(tableUsersWaiting,newUserWaiting)

        return {newUserWaiting,tableUsersWaiting}
    }

    it('User on hold',async ()=>{
     
        const {newUserWaiting}=await createUserWaiting('2432','Lucas','227.418.406-28','email@gmail.com','28.350.326-6','(35) 3220-7917')
       
        const res=await request(app).post('/api/session/').send({cpf:newUserWaiting.cpf,password:'123456'})

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User on hold')
      
    })


})