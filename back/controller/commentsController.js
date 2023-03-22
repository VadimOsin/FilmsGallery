const {ListComments, Comments, Film, Countries, Genres} = require('../models/models')
const ApiError = require('../error/ApiError');

class commentsController {
    async newFilm(req, res) {
        const {name} = req.body
        const type = await Film.create({name})
        return res.json(type)
    }

    async getAllFilms(req, res) {
        const films = await Film.findAll()
        return res.json(films)
    }

    async getOneBuId(req, res) {
        const {id} = req.params
        const film = await Film.findOne(
            {
                where: {id},
                include: [{model: Countries, as: 'country'}, {model: Genres, as: 'genre'}],
            },
        )
        return res.json(film)

    }

    async deleteFilm(req, res) {
        const {name} = req.body
        const type = await Film.create({name})
        return res.json(type)
    }

}

module.exports = new commentsController()