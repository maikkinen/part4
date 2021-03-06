const blogsRouter = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next (exception)
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
    next (exception)
  }

})

module.exports = blogsRouter

/*
    A router object is an isolated instance of middleware and routes.
    You can think of it as a “mini-application,”
    capable only of performing middleware and routing functions.
    Every Express application has a built-in app router.

*/