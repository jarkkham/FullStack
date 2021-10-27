import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommended = (props) => {
  const userResult = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (userResult.loading)  {
    return <div>loading...</div>
  }
  const user = userResult.data.me

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.books.map(b => {
            if(b.genres.includes(user.favoriteGenre)) {
              return (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              )
            } else return null
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended