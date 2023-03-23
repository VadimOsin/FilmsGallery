const Router = require('express')
const router = new Router()
const budgetController = require('../controllers/budgetController')


router.get('/:id', budgetController.getBudgetById)
router.post('/', budgetController.newBudget)
router.put('/', budgetController.updateBudget)
router.delete('/', budgetController.deleteBudget)

module.exports = router