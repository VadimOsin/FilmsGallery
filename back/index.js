require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, `static/${'user'||'film'}`)))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()