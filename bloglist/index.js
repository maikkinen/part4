const http = require('http') // jätä
const express = require('express')
const app = express() // vaihda tämä: ... = require('./app')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
//const config = require('.utils/config')

//const server = http.createServer(app)

/*
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

*/

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

//move to router
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

//move to router
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})