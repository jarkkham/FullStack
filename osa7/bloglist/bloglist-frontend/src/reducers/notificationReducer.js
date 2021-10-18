let notificationTimeOut

export const showNotification = (message, color) => {
  return async dispatch => {
    await clearTimeout(notificationTimeOut)
    notificationTimeOut = await setTimeout(() => dispatch({
      type: 'HIDE_NOTIFICATION'
    }), 5000)

    dispatch({
      type: 'SHOW_NOTIFICATION',
      message: message,
      color: color
    })
  }
}

const notificationReducer = (state = { message: '', color: 'green' }, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message, color: action.color }
    case 'HIDE_NOTIFICATION':
      return { message: '' }
    default:
      return state
  }
}

export default notificationReducer