const {Router}=require('express')
const {create}=require('../controllers/sessionsControllers')
const checkUserBanned = require('../middlewares/checkUserBanned')
const checkUserWaiting = require('../middlewares/checkUserWaiting')

const routes=new Router()

routes.post('/',checkUserBanned,checkUserWaiting,create)

module.exports=routes