import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './blogReducer'
import notifSlice from './notifReducer'
import userSlice from './userReducer'
import usersListSlice from './userListReducer'


const store = configureStore({
    reducer: {
        blogs: blogSlice,
        notif: notifSlice,
        user: userSlice,
        usersList: usersListSlice

    },
})

export default store
