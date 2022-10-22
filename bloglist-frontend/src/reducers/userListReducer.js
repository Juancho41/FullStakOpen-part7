import { createSlice } from '@reduxjs/toolkit'

import userServices from '../services/users'

const initialState = null

const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setUsersList (state, action) {
            return action.payload
        }
    },
})

export const initializeUsers = () => {
    return async (dispatch) => {
        const userList = await userServices.getAll()
        dispatch(setUsersList(userList))
    }
}



export const { setUsersList } = usersListSlice.actions
export default usersListSlice.reducer
