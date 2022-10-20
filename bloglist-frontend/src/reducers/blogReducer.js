import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'


const initialState = []


const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    voteBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const blogChanged = {
        ...blogToChange,
        votes: blogToChange.votes + 1
      }
      return state.map(anec => anec.id !== id ? anec : blogChanged)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
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


export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer