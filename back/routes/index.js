const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const commentsRouter = require('./commentsRouter')
const filmRouter = require('./filmRouter')
const budgetRouter = require('./budgetRouter')
const staffRouter = require('./staffRouter')
const commentsListRouter=require('./commentsListRouter')

router.use('/list', commentsListRouter)
router.use('/comments', commentsRouter)
router.use('/film', filmRouter)
router.use('/user', userRoutes)
router.use('/budget', budgetRouter)
router.use('/staff', staffRouter)

module.exports = router