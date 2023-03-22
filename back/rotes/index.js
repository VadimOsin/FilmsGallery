const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const filmRouter = require('./filmRouter')
const commentsRouter = require('./commentsRouter')

router.use('/user', userRoutes())
router.use('/comments', filmRouter())
router.use('/film', commentsRouter())


module.exports = router