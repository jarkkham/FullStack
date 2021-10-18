import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import styled from 'styled-components'

const StyledBar = styled.div`
  background-color: hsl(190, 100%, 5%);
  color: white;
  padding: 0 40px;
`

const StyledH2 = styled.h2`
  background-color: hsl(190, 100%, 5%);
  color: white;
  padding: 0 80px;
  display: inline-block;
  font-size: 18px;
`

const StyledLink = styled(Link)`
  background-color: hsl(190, 50%, 50%);
  color: white;
  border: none;
  margin: auto;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  transition-duration: 0.3s;
  
  &:hover {
    background-color: hsl(190, 50%, 25%);
  }
`

const StyledDiv = styled.div`
  display: inline-block;
  color: white;
  padding: 0px 50px;
`

const Menu = ({ StyledButton }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <StyledBar>
      <StyledH2>BLOG APP</StyledH2>
      <StyledLink to="/blogs">BLOGS</StyledLink>
      <StyledLink to="/users">USERS</StyledLink>
      {user !== null ?
        <StyledDiv>
          {user.name} {'logged in '}
          <StyledButton onClick={handleLogOut}>
            LOGOUT
          </StyledButton>
        </StyledDiv>
        : null
      }
    </StyledBar>
  )
}

export default Menu