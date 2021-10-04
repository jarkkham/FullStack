import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'

const Notification = ({ notification, notificationColor }) => {
  const notificationStyle = {
    color: notificationColor,
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification === null) {
    return <div />
  }
  else {
    return (
      <div style={notificationStyle} id="notification">
        {notification}
      </div>
    )
  }
}

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      displayNotification(`user ${user.name} logged in`, 'green')
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayNotification('wrong username or password', 'red')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )

  const displayNotification = (message, color) => {
    setNotification(message)
    setNotificationColor(color)
    setTimeout(() => setNotification(null), 5000)
  }

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      console.log(response)
      setBlogs(blogs.concat(response))
      displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green')
    } catch (exception) {
      displayNotification('error while adding blog', 'red')
    }
  }

  const likeBlog = async (event) => {
    try {
      const id = event.target.value
      const likedBlog = blogs.find(blog => blog.id === id)
      likedBlog.likes++
      await blogService.update(id, likedBlog)
      displayNotification(`blog ${likedBlog.title} liked`, 'green')
    } catch (exception) {
      displayNotification('error while updating blog', 'red')
    }
  }

  const removeBlog = async (event) => {
    const id = event.target.value
    const blogToRemove = blogs.find(blog => blog.id === id)
    const title = blogToRemove.title
    if(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        await blogService.remove(id, blogToRemove)
        setBlogs(blogs.filter(blog => blog.id !== id))
        displayNotification(`blog ${title} removed`, 'green')
      } catch (exception) {
        displayNotification('error while removing blog', 'red')
      }
    }
  }

  return (
    <div>
      <Notification
        notification={notification}
        notificationColor={notificationColor}
      />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <BlogForm
            handleLogOut={handleLogOut}
            addBlog={addBlog}
            blogs={blogs}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default App