import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './blogReducer'
import notifSlice from './notifReducer'


const store = configureStore({
    reducer: {
        blogs: blogSlice,
        notif: notifSlice

    },
})

export default store
