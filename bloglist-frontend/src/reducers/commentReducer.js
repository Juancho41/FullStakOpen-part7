import { createSlice } from '@reduxjs/toolkit'

import blogServices from '../services/blogs'

const initialState = null

const blogCommentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments (state, action) {
            return action.payload
        }
    },
})

export const initializeComment = (id) => {
    return async (dispatch) => {
        const comment = await blogServices.getComment(id)
        dispatch(setComments(comment))
    }
}



export const { setComments } = blogCommentSlice.actions
export default blogCommentSlice.reducer
