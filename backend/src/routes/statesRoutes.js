const {Router}=require('express')
const statesControllers=require('../controllers/statesControllers')

const routes=new Router()

routes.get('/',statesControllers.showStates)

module.exports=routes