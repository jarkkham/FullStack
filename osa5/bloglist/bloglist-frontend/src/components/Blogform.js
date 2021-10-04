import React, { useState } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ handleLogOut, addBlog, blogs, likeBlog, removeBlog, user }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const blogStyle = {
    paddingLeft: 2,
    marginTop: 5,
    border: 'solid',
    borderWidth: 1,
  }

  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
  }

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    addBlog(newBlog)
  }

  const RemoveButton = ({ blog }) => {
    if(user.username === blog.user.username) {
      return <button  id="remove" value={blog.id} onClick={removeBlog}>remove</button>
    }
    return null
  }

  return (
    <div className="formDiv">
      <button onClick={handleLogOut}>
        log out
      </button>
      <Togglable showButtonName="create new blog" hideButtonName="cancel">
        <h3>create new</h3>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input value={newBlogTitle} onChange={handleTitleChange} id="title" />
          </div>
          <div>
            author:
            <input value={newBlogAuthor} onChange={handleAuthorChange} id="author" />
          </div>
          <div>
            url:
            <input value={newBlogUrl} onChange={handleUrlChange} id="url" />
          </div>
          <button type="submit" id="create">create</button>
        </form>
      </Togglable>
      <div id="blogs">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Blog
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            >
            </Blog>
            <RemoveButton blog={blog} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogForm