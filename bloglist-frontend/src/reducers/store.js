import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './blogReducer'
import notifSlice from './notifReducer'
import userSlice from './userReducer'


const store = configureStore({
    reducer: {
        blogs: blogSlice,
        notif: notifSlice,
        user: userSlice

    },
})

export default store
