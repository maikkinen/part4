const blogsRouter = require('express').Router()

blogsRouter.get('/.', (request, response) => {
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



  blogsRouter.post('/.', (request, response) => {
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

module.exports = blogsRouter

/*
    A router object is an isolated instance of middleware and routes. 
    You can think of it as a “mini-application,” 
    capable only of performing middleware and routing functions. 
    Every Express application has a built-in app router.

*/