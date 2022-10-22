import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import blogServices from '../services/blogs'
import { timeNotif } from './notifReducer'


const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const logginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginServices.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogServices.setToken(user.token)
            dispatch(setUser(user))
            dispatch(timeNotif('Logged in successful', 3))

        } catch (error) {
            console.log(error.message)
            dispatch(timeNotif(`Wrong Credentials - ${error.message}`, 3))
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
