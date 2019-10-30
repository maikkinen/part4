require('dotenv').config()
const app = require('app') //index.js
const http = require('http') //index.js
const config = require('./utils/config') // index.js

const server = http.createServer(app) // index.js

const Blog = require('./models/blogpost.js')


//server.listen(config.PORT, () => {
//  console.log(`Server running on port ${config.PORT}`)
//})

//const Blog = mongoose.model('Blog', blogSchema)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})