import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  fontSize: 14;
  width: 50%;
`

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const visible = notification.message === '' ? false : true
  const color = notification.color === 'green' ? 'hsl(120, 80%, 80%)' : 'hsl(15, 80%, 80%)'

  const notificationStyle = {
    backgroundColor: color,
    display: visible ? '' : 'none'
  }

  return (
    <StyledDiv style={notificationStyle} id="notification">
      {notification.message}
    </StyledDiv>
  )
}

export default Notification