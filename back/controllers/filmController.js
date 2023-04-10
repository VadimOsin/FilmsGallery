const db = require("..//db")
const {INTEGER} = require("sequelize");
const uuid = require("uuid");
const path = require("path");


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
            let {
                category = "ALL",
                ratingTo = 10,
                keyword = "",
                yearFrom = 1500,
                yearTo = 3000,
                page = 1,
                limit = 10,
            } = req.query;

            // calculate offset based on page and limit
            const offset = (page - 1) * limit;

            // build SQL query
            let query = `SELECT *
                         FROM film
                         WHERE year BETWEEN ${yearFrom}
                           AND ${yearTo}`;

            if (category !== "ALL") {
                query += ` AND type='${category}'`;
            }

            if (ratingTo < 10) {
                query += ` AND ratingkinopoisk >= ${ratingTo} AND ratingkinopoisk < ${Number(parseInt(ratingTo) + 1)}`;
            }

            if (keyword !== "") {
                query += ` AND (nameru ILIKE '%' || $1 || '%' OR nameen ILIKE '%' || $1 || '%' OR nameoriginal ILIKE '%' || $1 || '%')`;
            } else {
                query += ` AND ($1::text IS NULL OR (nameru ILIKE '%' || $1 || '%' OR nameen ILIKE '%' || $1 || '%' OR nameoriginal ILIKE '%' || $1 || '%'))`;
            }

            query += ` ORDER BY id LIMIT ${limit} OFFSET ${offset}`;

            // execute query and count total number of rows
            const {rows} = await db.query(query, [keyword]);

            let countQuery;

            if (category !== "ALL" && ratingTo < 10 && keyword !== "") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND type ='${category}'
                                               AND ratingkinopoisk <= ${ratingTo}
                                               AND (nameru ILIKE '%' || $1 || '%'
                                                OR nameen ILIKE '%' || $1 || '%'
                                                OR nameoriginal ILIKE '%' || $1 || '%')`, [keyword]);
            } else if (category !== "ALL" && ratingTo < 10) {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND type ='${category}'
                                               AND ratingkinopoisk <= ${ratingTo}`);
            } else if (category !== "ALL" && keyword !== "") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND type ='${category}'
                                               AND (nameru ILIKE '%' || $1 || '%'
                                                OR nameen ILIKE '%' || $1 || '%'
                                                OR nameoriginal ILIKE '%' || $1 || '%')`, [keyword]);
            } else if (ratingTo < 10 && keyword !== "") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND type ='${category}'
                                               AND (nameru ILIKE '%' || $1 || '%'
                                                OR nameen ILIKE '%' || $1 || '%'
                                                OR nameoriginal ILIKE '%' || $1 || '%')`, [keyword]);
            } else if (ratingTo < 10 && keyword !== "") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND ratingkinopoisk <= ${ratingTo}
                                               AND (nameru ILIKE '%' || $1 || '%'
                                                OR nameen ILIKE '%' || $1 || '%'
                                                OR nameoriginal ILIKE '%' || $1 || '%')`, [keyword]);
            } else if (category !== "ALL") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND type ='${category}'`);
            } else if (ratingTo < 10) {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND ratingkinopoisk <= ${ratingTo}`);
            } else if (keyword !== "") {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}
                                               AND (nameru ILIKE '%' || $1 || '%'
                                                OR nameen ILIKE '%' || $1 || '%'
                                                OR nameoriginal ILIKE '%' || $1 || '%')`, [keyword]);
            } else {
                countQuery = await db.query(`SELECT COUNT(*)
                                             FROM film
                                             WHERE year BETWEEN ${yearFrom}
                                               AND ${yearTo}`);
            }

            const totalRows = parseInt(countQuery.rows[0].count);
            const totalPages = Math.ceil(totalRows / limit);

            res.status(200).json({films: rows, totalPages: totalPages});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server Error"});
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
                nameru = '',
                nameen = '',
                nameoriginal = '',
                posterurlpreview,
                ratingkinopoisk,
                year,
                filmlength,
                description,
                type,
                ratingagelimits,
                genres,
                countries
            } = req.body

            let fileName = ''
            if (!posterurlpreview) {
                const {img} = req.files
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static/film', fileName))
            }

            const newPost = await db.query(`UPDATE film
                                            SET nameru           = $2,
                                                nameen           = $3,
                                                nameoriginal     = $4,
                                                posterurlpreview = $5,
                                                ratingkinopoisk  = $6,
                                                year             = $7,
                                                filmlength       = $8,
                                                descriptions     = $9,
                                                type             = $10,
                                                ratingagelimits  = $11,
                                                genres           = $12,
                                                countries        = $13
                                            WHERE id = $1 RETURNING *;`, [id, nameru, nameen, nameoriginal, posterurlpreview ? posterurlpreview : fileName, ratingkinopoisk, year, filmlength, description, type, ratingagelimits, JSON.parse(genres),
                JSON.parse(countries)])
            res.json(newPost.rows[0])
        } catch (err) {
            res.status(400).json({message: "update film error" + err})
        }
    }

}

module.exports = new filmController()