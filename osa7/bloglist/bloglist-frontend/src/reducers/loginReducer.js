import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { showNotification } from './notificationReducer'

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
      dispatch(showNotification(`user ${user.name} logged in`, 'green'))
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'red'))
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    userService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default loginReducer