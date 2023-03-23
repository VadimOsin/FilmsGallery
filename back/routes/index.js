const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const commentsRouter = require('./commentsRouter')
const filmRouter = require('./filmRouter')
const budgetRouter=require('./budgetRouter')

router.use('/comments', commentsRouter)
router.use('/film', filmRouter)
router.use('/user', userRoutes)
router.use('/budget',budgetRouter)

module.exports = router