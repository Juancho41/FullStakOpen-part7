import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'


const initialState = []


const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    voteBlog(state, action) {

      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const blogChanged = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      console.log(blogChanged)
      return state.map(blog => blog.id !== id ? blog : blogChanged)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },

  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))

  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogServices.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const changeVote = (blogObject, id) => {
  return async dispatch => {
    await blogServices.update(blogObject, id)
    dispatch(voteBlog(id))
  }

}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogServices.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const { setBlogs, appendBlog, voteBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer