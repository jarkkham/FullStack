import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const likeBlog = jest.fn()

  let blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: 'test-user'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} />
    )
  })

  test('renders author and title', () => {
    expect(component.container).toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).toHaveTextContent(
      'Edsger W. Dijkstra'
    )
  })

  test('at start url and likes are not displayed', () => {
    const div = component.container.querySelector('.notVisibleAtStart')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking view, content is displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.notVisibleAtStart')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like twice sets likes 2', () => {
    const button = component.getByText('likes')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})