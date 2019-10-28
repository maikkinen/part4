const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogposts')
//const middleware = require('.utils/middleware')
const mongoose = require('mongoose')


console.log('connectin to dis: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to your super amazing MongoDB')
  })
  .catch((error) => {
    console.log('buu failed to connect to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('api/notes', blogsRouter)

module.exports = app