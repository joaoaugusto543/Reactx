const {Router}=require('express')
const { transition, clearExtract, checkDebt, getAccount } = require('../controllers/accountControllers')
const auth = require('../middlewares/auth')

const routes=new Router()

routes.get('/',auth,getAccount)
routes.post('/',auth,transition)
routes.put('/',auth,clearExtract)
routes.put('/check',auth,checkDebt)

module.exports=routes