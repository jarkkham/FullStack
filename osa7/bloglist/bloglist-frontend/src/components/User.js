import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Page = styled.div`
  color: hsl(190, 100%, 15%);
`

const User = () => {
  const id = useParams().id
  const users = useSelector(({ users }) => users)
  const user = users.find(user => user.id === id)

  const style = {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }

  if(!user) {
    return null
  }

  return (
    <Page>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            <p style={style}>{blog.title}</p>
          </li>
        )}
      </ul>
    </Page>
  )
}

export default User