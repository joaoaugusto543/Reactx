const {Router}=require('express')
const auth = require('../middlewares/auth')
const checkUserBanned = require('../middlewares/checkUserBanned')
const checkUserWaiting = require('../middlewares/checkUserWaiting')
const { askingForCredit } = require('../controllers/creditControllers')

const routes=new Router()

routes.post('/',auth,checkUserBanned,checkUserWaiting,askingForCredit)

module.exports=routes