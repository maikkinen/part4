require('dotenv').config()
const http = require('http') 
const express = require('express')
const app = express() 
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

//const config = require('.utils/config')

//const server = http.createServer(app)


//server.listen(config.PORT, () => {
//  console.log(`Server running on port ${config.PORT}`)
//})

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

console.log('connectin to dis: ', url)
mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to your super amazing MongoDB')
  })
  .catch((error) => {
    console.log('buu failed to connect to MongoDB: ', error.message)
  })

app.use(cors())
app.use(bodyParser.json())


//move to router in 4.2
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
      console.log("all blogs listed")
    })
    .catch(error => {
      console.log("cannot get u stuff")
    })
})

//move to router in 4.2
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      //response.status(201).json(result)
      response.json(result.toJSON())
      console.log("yey new blogpost added")
    })
    .catch(error => {
      console.log("cannot post that dude")
      console.log(request.body)
      console.log(response.body)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})