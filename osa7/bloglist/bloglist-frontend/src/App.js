import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/Blogform'
import LoginForm from './components/Loginform'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu.js'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import styled from 'styled-components'

const Page = styled.div`
  margin: auto;
  width: 50%;
`

const StyledButton = styled.button`
  background-color: hsl(190, 50%, 50%);
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px;
  font-size: 14px;
  transition-duration: 0.3s;

  &:hover {
    background-color: hsl(190, 50%, 25%);
  }
`

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div>
      <Router>
        <Menu StyledButton={StyledButton} />
        <Notification />
        {user === null ?
          <LoginForm StyledButton={StyledButton} /> :
          <div>
            <Page>
              <Switch>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/blogs/:id">
                  <Blog blogs={blogs} Button={StyledButton} />
                </Route>
                <Route path="/blogs">
                  {user !== null ?
                    <BlogForm
                      blogs={blogs}
                      user={user}
                      Button={StyledButton}
                    />
                    : null
                  }
                </Route>
              </Switch>
            </Page>
          </div>
        }
      </Router>
    </div>
  )
}

export default App