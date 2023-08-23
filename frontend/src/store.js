import {configureStore} from '@reduxjs/toolkit'
import usersWaitingReducer from './slices/usersWaitingSlices'
import authReducer from './slices/authSlices'
import userReducer from './slices/userSlices'
import accountReducer from './slices/accountSlices'
import supportReducer from './slices/supportSlices'
import creditReducer from './slices/creditSlices'

export const store=configureStore({
    reducer:{
        userWaiting:usersWaitingReducer,
        auth:authReducer,
        user:userReducer,
        account:accountReducer,
        support:supportReducer,
        credit:creditReducer
    }
}) 
