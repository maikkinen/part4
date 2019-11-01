require('dotenv').config()
const app = require('./app') //index.js
const http = require('http') //index.js
const config = require('./utils/config') // index.js

const server = http.createServer(app) // index.js

// eslint-disable-next-line no-unused-vars
const Blog = require('./models/blogpost.js')

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})