const Router = require('express')
const router = new Router()
const listCommentsController = require('../controllers/listCommentsController')


router.get('/', listCommentsController.getListComments)
router.put('/', listCommentsController.updateListComments)


module.exports = router