const blogsRouter = require('express').Router()
const Blog = require('../models/blogpost')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', (request, response) => {
  try {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        //response.status(201).json(result)
        response.json(result.toJSON())
        console.log('yey new blogpost added')
        response.status(200).end()
      })
      .catch(error => {
        console.log('cannot post that dude')
        console.log(request.body)
        console.log(response.body)
        response.status(400).end()
      })
  } catch (error) {
    response.status(400).end()

  }

})

module.exports = blogsRouter

/*
    A router object is an isolated instance of middleware and routes.
    You can think of it as a “mini-application,”
    capable only of performing middleware and routing functions.
    Every Express application has a built-in app router.

*/