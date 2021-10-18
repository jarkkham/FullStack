import React, { useState } from 'react'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import styled from 'styled-components'

const Page = styled.div`
  color: hsl(190, 100%, 15%);
  margin: 10px;
`

const Form = styled.form`
  padding: 5px;
`

const Input = styled.input`
  margin: 2px;
`

const StyledLink = styled(Link)`
  color: hsl(190, 50%, 25%);
  text-decoration: underline;
  font-size: 16px;
  transition-duration: 0.3s;

  &:hover {
    color: hsl(190, 50%, 50%);
  }
`

const StyledBlog = styled.div`
  margin-top: 20px;
`

const BlogList = styled.div`
  margin-top: 10px;
`

const BlogForm = ({ blogs, user, Button }) => {
  const dispatch = useDispatch()

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

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    try {
      dispatch(createBlog(newBlog))
      dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green'))
    } catch (exception) {
      dispatch(showNotification('error while adding blog', 'red'))
    }
  }

  const removeBlog = async (event) => {
    const id = event.target.value
    const blogToRemove = blogs.find(blog => blog.id === id)
    const title = blogToRemove.title
    if(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        dispatch(deleteBlog(blogToRemove.id))
        dispatch(showNotification(`blog ${title} removed`, 'green'))
      } catch (exception) {
        dispatch(showNotification('error while removing blog', 'red'))
      }
    }
  }

  return (
    <Page>
      <h2>Blogs</h2>
      <Togglable
        showButtonName="create new"
        hideButtonName="cancel"
        Button={Button}
      >
        <h3>Create new</h3>
        <Form onSubmit={addBlog}>
          <div>
            title:
            <Input value={newBlogTitle} onChange={handleTitleChange} id="title" />
          </div>
          <div>
            author:
            <Input value={newBlogAuthor} onChange={handleAuthorChange} id="author" />
          </div>
          <div>
            url:
            <Input value={newBlogUrl} onChange={handleUrlChange} id="url" />
          </div>
          <Button id="create">create</Button>
        </Form>
      </Togglable>
      <BlogList>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <StyledBlog key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </StyledLink>
            {user.username === blog.user.username ?
              <Button  value={blog.id} onClick={removeBlog}>
                remove
              </Button>
              : null
            }
          </StyledBlog>
        )}
      </BlogList>
    </Page>
  )
}

export default BlogForm