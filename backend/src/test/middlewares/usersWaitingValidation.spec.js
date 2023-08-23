const { deleteLine } = require('../../config/db')
const app = require('../../app')
const request=require('supertest')

describe('UsersWaitingValidation',()=>{

    afterEach(async () => {
        await deleteLine('userswaiting')
    })
    
    it('Validation',async ()=>{

        const newUserWaiting={}

        const res=await request(app).post('/api/userWaiting/').send(newUserWaiting)
        
        const body=res.body

        expect(body).toHaveProperty('errors')

    })

})