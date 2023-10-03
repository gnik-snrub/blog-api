const mongoose = require('mongoose')
const express = require('express')
const apiRouter = require('./routes/api')

const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

require('dotenv').config()

mongoose.set('strictQuery', false)
const mongoDB = process.env.MONGO_CT_URL

main().catch((err) => {console.log(err)})
async function main() {
  await mongoose.connect(mongoDB)
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

function verifyToken (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = verified
    next()
  } catch(err) {
    res.status(400).send('Invalid token')
  }
}
app.use(verifyToken)

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
