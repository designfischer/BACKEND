const express = require('express')
const cors = require('cors')
const connectToMongoDB = require('./database/mongoDbConnection')
const routes = require('./routes/routes')

const PORT = process.env.PORT || process.env.LOCAL_PORT

const app = express()

connectToMongoDB()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})