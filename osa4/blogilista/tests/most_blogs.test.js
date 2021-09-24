const listHelper = require('../utils/list_helper')

describe('author with most blogs', () => {

  test('when list has only one blog returns its author', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    const expected = {
        author: listHelper.listWithOneBlog[0].author,
        blogs: 1
    }
    expect(result).toEqual(expected)
  })
  
  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(listHelper.initialBlogs)
    const expected = {
        author: "Robert C. Martin",
        blogs: 3
    }
    expect(result).toEqual(expected)
  })
})