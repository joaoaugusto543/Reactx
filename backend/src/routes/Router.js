const express=require('express')
const Router=express()

Router.use('/api/userWaiting',require('./userWaitingRoutes'))
Router.use('/api/states',require('./statesRoutes'))
Router.use('/api/cities',require('./citiesRoutes'))
Router.use('/api/session',require('./sessionsRoutes'))
Router.use('/api/user',require('./userRoutes'))
Router.use('/api/credit',require('./creditRoutes'))
Router.use('/api/accounts',require('./accountRoutes'))
Router.use('/api/support',require('./supportRoutes'))

module.exports=Router