require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const app = express()
app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server start on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()