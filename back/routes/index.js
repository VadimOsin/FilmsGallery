const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const commentsRouter = require('./commentsRouter')
const filmRouter = require('./filmRouter')


router.use('/comments', commentsRouter)
router.use('/film', filmRouter)
router.use('/user', userRoutes)

module.exports = router