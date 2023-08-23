const {Router}=require('express')
const userWaitingController=require('../controllers/userWaitingControllers')
const {createUserWaiting} = require('../middlewares/usersWaitingValidation')
const handleValidation = require('../middlewares/handleValidation')
const checkUserBanned = require('../middlewares/checkUserBanned')
const checkUserWaiting = require('../middlewares/checkUserWaiting')

const routes=new Router()

routes.post('/',createUserWaiting(),handleValidation,checkUserBanned,checkUserWaiting,userWaitingController.createUserWaiting)

module.exports=routes