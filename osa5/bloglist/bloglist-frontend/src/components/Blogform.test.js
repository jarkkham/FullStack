import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'

test('<BlogForm /> calls onSubmit with right values', () => {
  let blog = [
    'Canonical string reduction',
    'Edsger W. Dijkstra',
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  ]

  const addBlog = jest.fn()

  const component = render(
    <BlogForm blogs={[]} addBlog={addBlog} />
  )

  const inputs = component.container.querySelectorAll('input')
  const form = component.container.querySelector('form')
  for(let i = 0; i < inputs.length; i++) {
    fireEvent.change(inputs[i], { target: { value: blog[i] } })
  }
  fireEvent.submit(form)

  expect(addBlog.mock.calls.length).toBe(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Canonical string reduction')
})