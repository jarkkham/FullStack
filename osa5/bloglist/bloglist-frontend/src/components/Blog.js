import React, { useState }  from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonName = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog" id={blog.title.replace(/\s+/g, '')}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility} id="view">
          {buttonName}
        </button>
      </div>
      <div style={showWhenVisible} className='notVisibleAtStart'>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button value={blog.id} onClick={likeBlog} id="like">likes</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog