const Router = require('express')
const router = new Router()
const staffController = require('../controllers/staffController')


router.get('/:id', staffController.getStaffById)
router.post('/', staffController.newStaff)
router.put('/', staffController.updateStaff)
router.delete('/', staffController.deleteStaff)

module.exports = router