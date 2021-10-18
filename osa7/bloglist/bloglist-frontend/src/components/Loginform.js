import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: none;
  margin: auto;
  padding: 15px 30px;
  color: hsl(190, 100%, 15%);
  text-align: center;
  text-decoration: none;
  font-size: 18px;
`

const LoginForm = ({ StyledButton }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <StyledDiv>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <StyledButton type="submit">LOG IN</StyledButton>
      </form>
    </StyledDiv>
  )
}

export default LoginForm