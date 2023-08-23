const app = require('../../app')
const request=require('supertest')

describe('Auth',()=>{

    it('Token is not provided',async ()=>{
     
        const res=await request(app).get('/api/user')

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Token was not provided')
      
    })

    it('Token is not provided',async ()=>{
     
        const res=await request(app).get('/api/user').set('Authorization','1233')

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Invalid token')
      
    })

})