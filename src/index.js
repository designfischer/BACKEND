const express = require('express')
const cors = require('cors')
const connectToMongoDB = require('./database/mongoDbConnection')
const routes = require('./routes/routes')

const app = express()

connectToMongoDB()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('Server running')
})