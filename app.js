const mongoose = require('mongoose')
const express = require('express')
const apiRouter = require('./routes/api')

require('dotenv').config()

mongoose.set('strictQuery', false)
const mongoDB = process.env.MONGO_CT_URL

main().catch((err) => {console.log(err)})
async function main() {
  await mongoose.connect(mongoDB)
}

const app = express()

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
