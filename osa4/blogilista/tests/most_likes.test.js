const listHelper = require('../utils/list_helper')

describe('author with most likes', () => {

  test('when list has only one blog returns its author', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    const expected = {
        author: listHelper.listWithOneBlog[0].author,
        likes: listHelper.listWithOneBlog[0].likes
    }
    expect(result).toEqual(expected)
  })
  
  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(listHelper.initialBlogs)
    const expected = {
        author: 'Robert C. Martin',
        likes: 12
    }
    expect(result).toEqual(expected)
  })
})