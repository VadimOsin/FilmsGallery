const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController')


router.get('/', commentsController.getById)
router.get('/all', commentsController.getAll)
router.get('/filmid', commentsController.getByIdFilm)
router.get('/userid', commentsController.getByIdUser)
router.post('/', commentsController.newComments)
router.delete('/', commentsController.deleteComments)
router.put('/', commentsController.updateComments)


module.exports = router