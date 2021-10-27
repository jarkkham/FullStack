import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, books }) => {
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(ALL_BOOKS)
  const [booksToShow, setBooksToShow] = useState([])
  const [genre, setSelectedGenre] = useState('all genres')
  const [genres, setGenres] = useState(['all genres'])

  const handleSelectedGenre = (event) => {
    const g = event.target.value
    setSelectedGenre(g)
    if(g === 'all genres') {
      setBooksToShow(books)
    } else {
      getBooksByGenre({ variables: { g } })
    }
  }
  
  useEffect(() => {
    setBooksToShow(books)
    let allGenres = ['all genres']
    books.forEach(b => {
      return (
        b.genres.forEach(g =>
          allGenres.includes(g) ? null : allGenres.push(g)
        )
      )
    })
    setGenres(allGenres)
  }, [books]) //eslint-disable-line

  useEffect(() => {
    if(booksByGenreResult.data)
      setBooksToShow(booksByGenreResult.data.allBooks)
  }, [booksByGenreResult])
  
  if (!show) {
    return null
  }

  if (booksByGenreResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

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
          {booksToShow.map(b => {
            if(b.genres.includes(genre) || genre === 'all genres') {
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
      filter by genre
      <select onChange={handleSelectedGenre}>
        {genres.map(g =>
          <option key={g} value={g}>
            {g}
          </option>
        )}
      </select>
    </div>
  )
}

export default Books