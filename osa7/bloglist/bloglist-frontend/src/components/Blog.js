import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import styled from 'styled-components'

const Page = styled.div`
  color: hsl(190, 100%, 15%);
`

const StyledLink = styled.a`
  color: hsl(190, 50%, 25%);
  text-decoration: underline;
  font-size: 16px;
  transition-duration: 0.3s;
  
  &:hover {
    color: hsl(190, 50%, 50%);
  }
`

const Blog = ({ blogs, Button }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const [newComment, setNewComment] = useState('')

  const style = {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }

  const likeBlog = async () => {
    try {
      const likedBlog = blogs.find(b => b.id === id)
      likedBlog.likes++
      dispatch(updateBlog(likedBlog))
      dispatch(showNotification(`blog ${likedBlog.title} liked`, 'green'))
    } catch (exception) {
      dispatch(showNotification('error while updating blog', 'red'))
    }
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const postComment = async (event) => {
    event.preventDefault()
    const comment = { content: newComment }
    setNewComment('')
    try {
      await blogService.comment(id, comment)
      dispatch(initializeBlogs())
      dispatch(showNotification('comment posted', 'green'))
    } catch (exception) {
      dispatch(showNotification('error when posting comment', 'red'))
    }
  }

  if(!blog) {
    return null
  }

  return (
    <Page>
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <StyledLink href={blog.url}>{blog.url}</StyledLink>
        <p style={style}>
          {blog.likes} {'likes '}
          <Button onClick={likeBlog}>like</Button>
        </p>
        <p style={style}>added by {blog.user.name}</p>
      </div>
      <form onSubmit={postComment}>
        <input value={newComment} onChange={handleCommentChange} />
        <Button>add comment</Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>
            {comment}
          </li>
        )}
      </ul>
    </Page>
  )
}

export default Blog