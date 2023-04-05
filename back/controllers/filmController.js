const db = require("..//db")


class filmController {

    async newFilm(req, res) {
        try {
            const {
                id,
                nameru,
                nameen,
                nameoriginal,
                posterurlpreview,
                ratingkinopoisk,
                year,
                filmlength,
                descriptions,
                type,
                ratingagelimits,
                genres,
                countries
            } = req.body.film
            const newPost = await db.query(`INSERT INTO film (id, nameRu, nameEn, nameOriginal, posterUrlPreview,
                                                              ratingKinopoisk, year, filmLength, descriptions, type,
                                                              ratingAgeLimits, genres,
                                                              countries)
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                                                    $11, $12,
                                                    $13) RETURNING *`, [id, nameru, nameen, nameoriginal, posterurlpreview, ratingkinopoisk, year, filmlength, descriptions, type, ratingagelimits, genres,
                countries])
            res.json(newPost.rows[0])
        } catch (err) {
            res.status(400).json({message: "add film error" + err})
        }
    }

    async getAllFilms(req, res) {

        try {
            const film = await db.query(`SELECT *
                                         FROM film`)
            res.json(film.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getAll film' + err})
        }
    }

    async getOneBuId(req, res) {
        try {
            const {id} = req.params
            const film = await db.query(`SELECT *
                                         FROM film
                                         where id = $1`, [id])
            res.json(film.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getFilmById ' + err})
        }
    }

    async deleteFilm(req, res) {
        try {
            const id = req.query.id
            const film = await db.query(`DELETE
                                         FROM film
                                         WHERE id = $1`, [id])
            res.json({message: 'Film deleted'})
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed delete film' + err})
        }
    }

    async updateFilm(req, res) {
        try {
            const {
                id,
                nameRu,
                nameEn,
                nameOriginal,
                posterUrlPreview,
                ratingKinopoisk,
                year,
                filmLength,
                description,
                type,
                ratingAgeLimits,
                genres,
                countries
            } = req.body
            const newPost = await db.query(`UPDATE film
                                            SET nameRu           = $2,
                                                nameEn           = $3,
                                                nameOriginal     = $4,
                                                posterUrlPreview = $5,
                                                ratingKinopoisk  = $6,
                                                year             = $7,
                                                filmLength       = $8,
                                                descriptions     = $9,
                                                type             = $10,
                                                ratingAgeLimits  = $11,
                                                genres           = $12,
                                                countries        = $13
                                            WHERE id = $1 RETURNING *;`, [id, nameRu, nameEn, nameOriginal, posterUrlPreview, ratingKinopoisk, year, filmLength, description, type, ratingAgeLimits, genres,
                countries])
            res.json(newPost.rows[0])
        } catch (err) {
            res.status(400).json({message: "update film error" + err})
        }
    }

}

module.exports = new filmController()