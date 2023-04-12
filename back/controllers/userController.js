const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require("..//db")
const uuid = require('uuid')
const path = require('path');
const generateJwt = (id, email, role,name,surname,img) => {
    return jwt.sign(
        {id, email, role,name,surname,img},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role, name, surname} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await db.query(`SELECT *
                                              FROM "user"
                                              where email = $1`, [email])
            if (candidate.rows[0]) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static/user', fileName))

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await db.query(`INSERT INTO "user" (email, password, role)
                                         values ($1, $2, $3) RETURNING *`, [email, hashPassword, role])
            const user_meta = await db.query(`INSERT INTO usermeta (name, surname, img, user_meta_id)
                                              values ($1, $2, $3,
                                                      $4) RETURNING *`, [name, surname, fileName, user.rows[0].id])
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role,user_meta.rows[0].name,user_meta.rows[0].surname,user_meta.rows[0].img)
            return res.json({ token});
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
            const user_meta = await db.query(`SELECT *
                                         FROM usermeta
                                         where user_meta_id = $1`, [user.rows[0].id])
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role,user_meta.rows[0].name,user_meta.rows[0].surname,user_meta.rows[0].img)
            return res.json({ token });
        } catch (e) {
            res.status(400).json({message: "login error"})
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role,req.user.name,req.user.surname,req.user.img)
        return res.json({token})
    }

    async userInfo(req, res) {
        try {
            const id = req.query.id
            const user = await db.query(`SELECT *
                                             FROM "usermeta"
                                             where user_meta_id = $1`, [id])
            res.json(user.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed get User By Id comment' + err})
        }
    }
}

module.exports = new UserController()