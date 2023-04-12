const db = require("..//db")


class commentsController {
    async newComments(req, res) {
        const {title, text, likes, user_id,film_id} = req.body;
        try {
            const comments = await db.query(
                `INSERT INTO comment (title, text, likes, user_id, film_id)
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [title, text, likes, parseInt(user_id), parseInt(film_id)]
            );
            res.status(201).json(comments.rows[0]); // Return the newly created comment with 201 Created status
        } catch (err) {
            res.status(500).send('Failed to create a new comment' + err); // Return 500 Internal Server Error if something went wrong
        }
    }

    async getAll(req, res) {
        try {
            const comments = await db.query(`SELECT *
                                             FROM comment`)
            res.json(comments.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getAll comment' + err})
        }
    }

    async getById(req, res) {
        try {
            const id = req.query.id
            const comments = await db.query(`SELECT *
                                             FROM comment
                                             where id = $1`, [id])
            res.json(comments.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getCommetnById comment' + err})
        }
    }

    async deleteComments(req, res) {
        try {


            const id = req.query.id
            const comments = await db.query(`DELETE
                                             FROM comment
                                             WHERE id = $1`, [id])
            res.json(comments.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed delete comment' + err})
        }
    }

    async updateComments(req, res) {
        try {
            const {id, title, text, likes, user_id,film_id} = req.body
            const comment = await db.query(
                `UPDATE comment
                 SET title  = $1,
                     text   = $2,
                     likes  = $3,
                     user_id= $4,
                     user_id= $5
                 WHERE id = $6 RETURNING *`,
                [title, text, likes, user_id,film_id, id]
            )
            res.json(comment.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed update comment' + err})
        }
    }

    async getByIdFilm(req, res) {
        try {
            const id = req.query.id
            const comments = await db.query(`SELECT *
                                             FROM comment
                                             where film_id = $1`, [id])
            res.json(comments.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed get Comment By Id Film comment' + err})
        }
    }


    async getByIdUser(req, res) {
        try {
            const id = req.query.id
            const comments = await db.query(`SELECT *
                                             FROM comment
                                             where user_id = $1`, [id])
            res.json(comments.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed get Comment By Id User comment' + err})
        }
    }

}

module.exports = new commentsController()