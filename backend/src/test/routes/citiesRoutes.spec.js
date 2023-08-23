const request=require('supertest')
const app=require('../../app')
const baseUrl='/api/cities'

describe('CitiesRoutes',()=>{

    it('Get cities',async ()=>{

        const res=await request(app).get(`${baseUrl}/`)

        const cities=res.body

        expect(cities).toHaveLength(5570)
    })

})