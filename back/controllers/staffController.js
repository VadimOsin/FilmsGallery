const db = require("..//db")


class staffController {
    async newStaff(req, res) {
        try {
            const {
                id,
                nameRu,
                nameEn,
                description,
                posterUrl,
                professionText,
                professionKey
            } = req.body
            const staff = await db.query(`INSERT INTO staff (id,
                                                             nameRu,
                                                             nameEn,
                                                             description,
                                                             posterUrl,
                                                             professionText,
                                                             professionKey)
                                          values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [id,
                    nameRu,
                    nameEn,
                    description,
                    posterUrl,
                    professionText,
                    professionKey])
            res.json(staff.rows[0])
        } catch (err) {
            res.status(400).json({message: "add staff error" + err})
        }
    }

    async getStaffById(req, res) {
        try {
            const {id} = req.params
            const staff = await db.query(`SELECT *
                                          FROM staff
                                          where id = $1`, [id])
            res.json(staff.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed getStaffById ' + err})
        }
    }

    async updateStaff(req, res) {
        try {
            const {
                id,
                nameRu,
                nameEn,
                description,
                posterUrl,
                professionText,
                professionKey
            } = req.body
            const staff = await db.query(`UPDATE staff
                                          SET nameRu         = $2,
                                              nameEn         = $3,
                                              description    = $4,
                                              posterUrl      = $5,
                                              professionText = $6,
                                              professionKey  = $7
                                          WHERE id = $1 RETURNING *;`,
                [id,
                    nameRu,
                    nameEn,
                    description,
                    posterUrl,
                    professionText,
                    professionKey])
            res.json(staff.rows[0])
        } catch (err) {
            res.status(400).json({message: "Update staff error" + err})
        }
    }

    async deleteStaff(req, res) {
        try {
            const id = req.query.id
            const staff = await db.query(`DELETE
                                          FROM staff
                                          WHERE id = $1`, [id])
            res.json({message: 'Staff deleted'})
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Failed staff budget' + err})
        }
    }

}

module.exports = new staffController()