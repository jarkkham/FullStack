const { request } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

const initialUser = {
  username: 'dabramov',
  name: 'Dan Abramov',
  password: '1243234345'
}
let token = String

describe('when there is initially blogs saved', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const res = await api
      .post('/api/users')
      .send(initialUser)

    const login = await api
      .post('/api/login')
      .send(initialUser)

    token = login.body.token
    const usersResponse = await api.get('/api/users')

    await Blog.deleteMany({})
    for(let blog of listHelper.initialBlogs) {
      let blogObject = new Blog(blog)
      blogObject.user = usersResponse.body[0].id
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(listHelper.initialBlogs.length)
  })

  test('blogs have id',  async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('adding a new blog', () => {
    test('succeeds with valid data',  async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
      
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1)
      expect(response.body.filter(obj => obj.title === newBlog.title).length).toBe(1)
    })
  
    test('with no likes property has 0 likes',  async () => {
      const blogWithoutLikes = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        __v: 0
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogWithoutLikes)
    
      const response = await api.get('/api/blogs')
      expect(response.body.filter(obj => obj.title === blogWithoutLikes.title)[0].likes).toBe(0)
    })
  
    test('without title or url is not added',  async () => {
      const blogWithoutTitle = {
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    
      const blogWithoutUrl = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
        __v: 0
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400)
    
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogWithoutUrl)
        .expect(400)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(listHelper.initialBlogs.length)
    })

    test('without authorization is not added',  async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(listHelper.initialBlogs.length)
      expect(response.body.filter(obj => obj.title === newBlog.title).length).toBe(0)
    })
  })
  
  describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid',  async () => {
      await api
        .delete(`/api/blogs/${listHelper.initialBlogs[0]._id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(listHelper.initialBlogs.length - 1)
    })
  })
  
  describe('updating a blog', () => {
    test('with valid id succeeds',  async () => {
      const updatedBlog = {
        _id: "5a422a851b54a676234d17f7",
        likes: 9,
        __v: 0
      }
    
      await api
        .put(`/api/blogs/${updatedBlog._id}`)
        .set('Authorization', `bearer ${token}`)
        .send(updatedBlog)
        .expect(200)
    
      const response = await api.get('/api/blogs')
      expect(response.body[0].likes).toBe(updatedBlog.likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})