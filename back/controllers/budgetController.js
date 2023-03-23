const db = require("..//db")


class budgetController {
    async newBudget(req, res) {
        try {
            const {
                id,
                type,
                amount,
                symbol
            } = req.body
            const newPost = await db.query(`INSERT INTO budget (id,
                                                                type,
                                                                amount,
                                                                symbol)
                                            values ($1, $2, $3, $4) RETURNING *`,
                [id,
                    type,
                    amount,
                    symbol])
            res.json(newPost.rows[0])
        } catch (err) {
            res.status(400).json({message: "add budget error" + err})
        }
    }

    async getBudgetById(req, res) {
        try {
            const {id} = req.params
            const budget = await db.query(`SELECT *
                                           FROM budget
                                           where id = $1`, [id])
            res.json(budget.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getBudgetById ' + err})
        }
    }

    async updateBudget(req, res) {
        try {
            const {
                id,
                type,
                amount,
                symbol
            } = req.body
            const newPost = await db.query(`UPDATE budget
                                            SET type   = $2,
                                                amount = $3,
                                                symbol = $4
                                            WHERE id = $1 RETURNING *;`, [id,
                type,
                amount,
                symbol])
            res.json(newPost.rows[0])
        } catch (err) {
            res.status(400).json({message: "Update budget error" + err})
        }
    }

    async deleteBudget(req, res) {
        try {
            const id = req.query.id
            const budget = await db.query(`DELETE
                                           FROM budget
                                           WHERE id = $1`, [id])
            res.json({message: 'Budget deleted'})
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed delete budget' + err})
        }
    }

}

module.exports = new budgetController()