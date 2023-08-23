const request=require('supertest')
const app=require('../../app')
const baseUrl='/api/states'

describe('StatesRoutes',()=>{

    it('Get states',async ()=>{

        const res=await request(app).get(`${baseUrl}/`)

        const states=res.body

        expect(states).toHaveLength(27)
    })

})