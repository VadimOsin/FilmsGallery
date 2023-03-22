const db = require("..//db")


class filmController{
    async newFilm(req, res) {
        return res.json({message:'ok'})
    }

    async getAllFilms(req, res) {

        return  res.json({message:'ok'})
    }

    async getOneBuId(req, res) {
        // const {id} = req.params
        // const film = await Film.findOne({
        //     where: {id}, include: [{model: Countries, as: 'country'}, {model: Genres, as: 'genre'}],
        // },)
        // return res.json(film)
        return res.json({message:'ok'})
    }

    async deleteFilm(req, res) {
        return res.json({message:'ok'})
    }

}

module.exports = new filmController()