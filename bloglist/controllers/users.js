const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
let users = []

usersRouter.get('/', async (request, response) => {
  users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    //This is needed for checking that users have unique names.
    //if: passw min 8 char long
    //else if: name is unique
    //both passed --> new user created.

    if(body.password.length <= 7) {
      return response.status(400).json({
        error: 'Password has to be min 8 char long.'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter