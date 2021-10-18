import blogService from '../services/blogs'
import { initializeUsers } from './userReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)

    dispatch(initializeUsers())

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch(initializeUsers())

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, blog)

    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      return state.map(object => object.id === action.data.id ? action.data : object)
    case 'REMOVE_BLOG':
      return state.filter(object => object.id !== action.data.id)
    default:
      return state
  }
}

export default blogReducer