const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
<<<<<<< HEAD
  title: String,
  author: String,
  url: String,
  likes: Number
=======
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
>>>>>>> 8ca62f0... Teht_4.10 and 4.12 completed
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)