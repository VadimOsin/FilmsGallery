const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require("..//db")

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await db.query(`SELECT *
                                              FROM "user"
                                              where email = $1`, [email])
            if (candidate.rows[0]) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await db.query(`INSERT INTO "user" (email, password, role)
                                         values ($1, $2, $3) RETURNING *`, [email, hashPassword, role])

            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role)
            return res.json({token})
        } catch (e) {
            res.status(400).json({message: "registration error"})
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await db.query(`SELECT *
                                         FROM "user"
                                         where email = $1`, [email])
            if (!user.rows[0]) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role)
            return res.json({token})
        } catch (e) {
            res.status(400).json({message: "login error"})
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()