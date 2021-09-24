const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(12)
  })
  
  test('total likes of the list is right', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs)
    expect(result).toBe(24)
  })
})