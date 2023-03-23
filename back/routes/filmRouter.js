const Router = require('express')
const router = new Router()
const filmController = require('../controllers/filmController')


router.get('/all', filmController.getAllFilms)
router.get('/:id', filmController.getOneBuId)
router.post('/', filmController.newFilm)
router.put('/', filmController.updateFilm)
router.delete('/', filmController.deleteFilm)

module.exports = router