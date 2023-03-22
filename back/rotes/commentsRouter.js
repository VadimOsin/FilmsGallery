const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController')


router.get('/comments', commentsController.commentsByUser)
router.get('/comments/all', commentsController.getAll)
router.post('/comments', commentsController.newComments)
router.delete('/comments', commentsController.deleteComments)

module.exports = router