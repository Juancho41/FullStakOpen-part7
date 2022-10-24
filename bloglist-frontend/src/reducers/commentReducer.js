import { createSlice } from '@reduxjs/toolkit'
import { timeNotif } from './notifReducer'
import blogServices from '../services/blogs'

const initialState = null

const blogCommentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments (state, action) {
            return action.payload
        },
        appendBlogComment(state, action) {
            state.push(action.payload)
          },
    },
})

export const initializeComment = (id) => {
    return async (dispatch) => {
        const comment = await blogServices.getComment(id)
        dispatch(setComments(comment))
    }
}

export const createBlogComment = (id, comment) => {
    return async dispatch => {
        try {
            const newBlogComment = await blogServices.createComment(id, comment)
            dispatch(appendBlogComment(newBlogComment))
            dispatch(timeNotif('Comment added!', 3))

        } catch (error) {
            console.log(error.message)
            dispatch(timeNotif(`${error.message}`, 3))
        }

    }
  }



export const { setComments, appendBlogComment } = blogCommentSlice.actions
export default blogCommentSlice.reducer
