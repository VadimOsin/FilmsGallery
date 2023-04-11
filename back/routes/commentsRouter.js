const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController')


router.get('/', commentsController.commentsByUser)
router.get('/all', commentsController.getAll)
router.post('/', commentsController.newComments)
router.delete('/', commentsController.deleteComments)
router.put('/', commentsController.updateComments)


module.exports = router