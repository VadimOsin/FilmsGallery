const Router = require('express')
const router = new Router()
const filmController = require('../controllers/filmController')


router.get('/films', filmController.getAllFilms)
router.get('/film', filmController.getOneBuId)
router.post('/film', filmController.newFilm,)
router.delete('/film', filmController.deleteFilm)

module.exports = router