const {Router}=require('express')
const {updateUser,profile, deleteUser}=require('../controllers/userController')
const auth = require('../middlewares/auth')
const checkUserBanned = require('../middlewares/checkUserBanned')
const checkUserWaiting = require('../middlewares/checkUserWaiting')
const {validationUpdateUser} = require('../middlewares/usersValidation')
const handleValidation = require('../middlewares/handleValidation')


const routes=new Router()

routes.put('/',auth,checkUserBanned,checkUserWaiting,validationUpdateUser(),handleValidation,updateUser)
routes.get('/',auth,checkUserBanned,checkUserWaiting,profile)
routes.delete('/',auth,checkUserBanned,checkUserWaiting,deleteUser)

module.exports=routes