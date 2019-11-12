const blogsRouter = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //decodedToken.id === request.params.userId
    //decoded

    const blogToBeRemoved = await Blog.findById(request.params.id)

    if (blogToBeRemoved.user.toString() === decodedToken.id.toString()) {

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id
  }

  console.log(request.body)

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog.toJSON)
  } catch (exception) {
    next(exception)
  }

})

module.exports = blogsRouter

/*
    A router object is an isolated instance of middleware and routes.
    You can think of it as a “mini-application,”
    capable only of performing middleware and routing functions.
    Every Express application has a built-in app router.

*/