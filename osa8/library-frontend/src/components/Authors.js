import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [year, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const options = [{}]

  const [editAuthor] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [{ query: ALL_AUTHORS }] }
  )

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  authors.forEach(a => {
    options.push({ value: a.name, label: a.name })
  })

  const updateAuthor = (event) => {
    event.preventDefault()
    const name = selectedAuthor.value
    const born = parseInt(year)
    editAuthor({ variables: { name, born } })
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <input value={selectedAuthor} type="hidden"/>
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={year}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors