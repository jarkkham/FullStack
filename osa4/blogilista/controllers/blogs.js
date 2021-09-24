const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if(!body.title || !body.url) {
    return response.status(400).json()
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    return response.status(400).json()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToRemove = await Blog.findById(request.params.id)

  if(!blogToRemove) {
    return response.status(401).json({ error: 'blog not found' })
  }
  if(user._id.toString() !== blogToRemove.user.toString()) {
    return response.status(401).json({ error: 'blogs can only be removed by their creator' })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    return response.status(400).json()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body
  const blogToUpdate = await Blog.findById(request.params.id)

  if(!blogToUpdate) {
    return response.status(400).json('blog not found')
  }

  if(user._id.toString() !== blogToUpdate.user.toString()) {
    return response.status(401).json({ error: 'blogs can only be updated by their creator' })
  }

  const blog = {
    title: body.title || blogToUpdate.title,
    author: body.author|| blogToUpdate.author,
    url: body.url || blogToUpdate.url,
    likes: body.likes || blogToUpdate.likes,
  }
  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json()
  } catch(exception) {
    return response.status(400).json()
  }
})

module.exports = blogsRouter