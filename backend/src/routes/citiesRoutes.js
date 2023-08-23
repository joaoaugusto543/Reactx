const {Router}=require('express')
const citiesControllers=require('../controllers/citiesControllers')

const routes=new Router()

routes.get('/',citiesControllers.showCities)

module.exports=routes