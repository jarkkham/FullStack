const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

  test('when list has only one blog returns that', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    expect(result).toEqual(listHelper.listWithOneBlog[0])
  })
  
  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs)
    expect(result).toEqual(listHelper.initialBlogs[2])
  })
})