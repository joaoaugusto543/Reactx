const app = require('../../app')
const request=require('supertest')

const baseUrl='/api/support'

describe('supportRoutes',()=>{

    const support={
        name:'Marcos',
        email:'marcos@gmail.com',
        message:'Estou apenas testando....'
    }

    it('Send Email',async ()=>{
        const res=await request(app).post(`${baseUrl}/`).send(support)

        const body=res.body

        expect(body).toHaveProperty('success')
        expect(body.success).toBe('Send email')
    })
})