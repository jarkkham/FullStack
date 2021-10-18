const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.username) {
    return response.status(400).json('username missing')
  }
  if(!body.password) {
    return response.status(400).json('password missing')
  }
  if(body.username.length < 3) {
    return response.status(400).json('username too short')
  }
  if(body.password.length < 3) {
    return response.status(400).json('password too short')
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch(exception) {
    return response.status(400).json('username must be unique')
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    return response.status(400).json()
  }
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const userToUpdate = await User.findById(request.params.id)

  if(!userToUpdate) return response.status(400).json()
  
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = {
    username: body.username || userToUpdate.username,
    name: body.name || userToUpdate.name,
    passwordHash,
  }

  try {
    await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.status(200).json()
  } catch(exception) {
    return response.status(400).json()
  }
})

module.exports = usersRouter