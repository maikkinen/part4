require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  console.log('now connected to the test db')
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}

/* Handle env variables in this module.
   Other parts get access to 'em as you import the configuration module:

    const config = require('./utils/config')

    console.log(`Server running on port ${config.PORT}`)

*/
