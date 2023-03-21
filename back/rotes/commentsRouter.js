const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController')


router.get('/comments', commentsController.commentsByUser)

module.exports = router