import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    const updatedUser = await userService.update(user.id, user)

    dispatch({
      type: 'UPDATE_USER',
      data: updatedUser
    })
  }
}

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'UPDATE_USER':
      return state.map(object => object.id === action.data.id ? action.data : object)
    default:
      return state
  }
}

export default userReducer