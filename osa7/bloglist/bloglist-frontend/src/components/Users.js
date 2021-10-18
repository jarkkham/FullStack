import React  from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: hsl(190, 100%, 15%);
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.3s;
  
  &:hover {
    color: hsl(190, 50%, 60%);
  }
`

const Table = styled.table`
  background-color: hsl(190, 50%, 50%);
  border-radius: 5px;
`

const Tr = styled.tr`
  background-color: hsl(190, 50%, 60%);
  padding: 5px;
`

const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <StyledDiv>
      <h2>Users</h2>
      <Table>
        <tbody>
          <Tr>
            <th></th>
            <th>blogs created</th>
          </Tr>
        </tbody>
        {users.map(user =>
          <tbody key={user.id}>
            <Tr>
              <td>
                <StyledLink to={`/users/${user.id}`}>
                  { user.name }
                </StyledLink>
              </td>
              <td>
                { user.blogs.length }
              </td>
            </Tr>
          </tbody>
        )}
      </Table>
    </StyledDiv>
  )
}

export default Users