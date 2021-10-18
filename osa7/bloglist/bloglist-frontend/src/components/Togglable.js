import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <props.Button onClick={toggleVisibility}>
          {props.showButtonName}
        </props.Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <props.Button onClick={toggleVisibility}>
          {props.hideButtonName}
        </props.Button>
      </div>
    </div>
  )
}

export default Togglable