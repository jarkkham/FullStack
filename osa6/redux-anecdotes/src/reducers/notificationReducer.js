let notificationTimeOut

export const showNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(notificationTimeOut)
    
    notificationTimeOut = await setTimeout(() => dispatch({
      type: 'HIDE_NOTIFICATION'
    }), seconds * 1000)

    dispatch({
      type: 'SHOW_NOTIFICATION',
      message: message
    })
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer