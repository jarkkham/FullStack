const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    _id: '614af3e2b337469d336888f7',
    username: 'alovelace',
    name: 'Ada Lovelace',
    password: '3944532352',
    __v: 0
  },
  {
    _id: '614af3ececc61f999a3acbdf',
    username: 'dabramov',
    name: 'Dan Abramov',
    password: '1243234345',
    __v: 0
  },
  {
    _id: '614af3f14e7ae28b9591e30c',
    username: 'mpoppendieck',
    name: 'Mary Poppendieck',
    password: '3923642312',
    __v: 0
  }
]

describe('when there is initially users saved', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('users are returned as json', async () => {
    await api.get('/api/users').expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('users have id',  async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
  })

  describe('adding a new user', () => {
    test('succeeds with valid data',  async () => {
      const newUser = {
        _id: '614af3f77b0c073db3bd8ece',
        username: 'ahellas',
        name: 'Arto Hellas',
        password: '123123123',
        __v: 0
      }
    
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length + 1)
      expect(response.body.filter(obj => obj.username === newUser.username).length).toBe(1)
    })
  
    test('without username or password is not added',  async () => {
      const userWithoutUsername = {
        _id: '614af3f77b0c073db3bd8ece',
        name: 'Arto Hellas',
        password: '123123123',
        __v: 0
      }
    
      const userWithoutPassword = {
        _id: '614af3feb976a70e4254b0b6',
        username: 'ahellas',
        name: 'Arto Hellas',
        __v: 0
      }
    
      await api
        .post('/api/users')
        .send(userWithoutUsername)
        .expect(400)
    
      await api
        .post('/api/users')
        .send(userWithoutPassword)
        .expect(400)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length)
    })
  
    test('with too short username or password is not added',  async () => {
      const userWithShortUsername = {
        _id: '614af3f77b0c073db3bd8ece',
        username: 'ah',
        name: 'Arto Hellas',
        password: '123123123',
        __v: 0
      }
    
      const userWithShortPassword = {
        _id: '614af3feb976a70e4254b0b6',
        username: 'ahellas',
        name: 'Arto Hellas',
        password: '12',
        __v: 0
      }
    
      await api
        .post('/api/users')
        .send(userWithShortUsername)
        .expect(400)
    
      await api
        .post('/api/users')
        .send(userWithShortPassword)
        .expect(400)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length)
    })
  
    test('without unique username is not added',  async () => {
      const newUser = {
        _id: '614af3f77b0c073db3bd8ece',
        username: 'alovelace',
        name: 'Ada Lovelace',
        password: '4321432143',
        __v: 0
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length)
    })
  })
  
  describe('deleting a user', () => {
    test('succeeds with status code 204 if id is valid',  async () => {
      await api
        .delete(`/api/users/${initialUsers[0]._id}`)
        .expect(204)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length - 1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})