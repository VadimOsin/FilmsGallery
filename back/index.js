require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server start on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start().then(r => console.log(r))
