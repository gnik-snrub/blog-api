const apiController = require('./controllers/apiController')

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

const compression = require('compression')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')

const app = express()

app.use(compression())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["self", "code.jquery.com", "cdn.jsdelivr.net"]
    }
  })
)
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30
})
app.use(limiter)

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use('/api', apiRouter)

app.use('/', express.static('frontend/dist'))

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
