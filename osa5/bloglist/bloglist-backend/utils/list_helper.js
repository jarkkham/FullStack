const blog = require("../models/blog")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, currentBlog) => {
    return totalLikes + currentBlog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteIndex = blogs.reduce((index, currentBlog) => {
    if(currentBlog.likes > blogs[index].likes) {
      index = blogs.indexOf(currentBlog)
    }
    return index
  }, 0)
  return blogs[favoriteIndex]
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((array, currentBlog) => {
    if(array.filter(obj => obj.author === currentBlog.author).length === 0) {
      const author = {
        author: currentBlog.author,
        blogs: 1
      }
      array.push(author)
    }
    else {
      array[array.findIndex(obj => obj.author === currentBlog.author)].blogs++
    }
    return array
  }, [])
  
  const index = authors.reduce((index, currentAuthor) => {
    if(currentAuthor.blogs > authors[index].blogs) {
      index = authors.indexOf(currentAuthor)
    }
    return index
  }, 0)
  return authors[index]
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((array, currentBlog) => {
    if(array.filter(obj => obj.author === currentBlog.author).length === 0) {
      const author = {
        author: currentBlog.author,
        likes: currentBlog.likes
      }
      array.push(author)
    }
    else {
      const found = array.findIndex(obj => obj.author === currentBlog.author)
      array[found].likes = array[found].likes + currentBlog.likes
    }
    return array
  }, [])
  
  const index = authors.reduce((index, currentAuthor) => {
    if(currentAuthor.likes > authors[index].likes) {
      index = authors.indexOf(currentAuthor)
    }
    return index
  }, 0)
  return authors[index]
}

module.exports = {
  initialBlogs,
  listWithOneBlog,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}