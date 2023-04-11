const db = require("..//db")


class listCommentsController {

    async getListComments(req, res) {
        try {
            const id = req.query.id
            const listComments = await db.query(`SELECT * FROM "listComments" WHERE (id) = $1`, [id])
            res.json(listComments.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed to get List comments: ' + err})
        }
    }



    async updateListComments(req, res) {
        try {
            const {id, comments_id} = req.body
            const comment = await db.query(
                `UPDATE "listComments"
                 SET "comments_id" = $2
                 WHERE id = $1 RETURNING *`,
                [id, comments_id]
            );
            res.json(comment.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed update comment' + err})
        }
    }
}

module.exports = new listCommentsController()