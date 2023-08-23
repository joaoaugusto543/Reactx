const {Router}=require('express')
const supportControllers=require('../controllers/supportControllers')

const routes=new Router()

routes.post('/',supportControllers.support)

module.exports=routes