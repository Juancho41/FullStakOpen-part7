import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    nullNotif () {
        return null
    }
  }
})

let timeOut

export const timeNotif = (notif, time) => {

    return dispatch => {
        clearTimeout(timeOut)
        dispatch(setNotif(notif))
        timeOut = setTimeout(() => {

            dispatch(nullNotif())
        }, time * 1000)
    }
}



export const { setNotif, nullNotif } = notifSlice.actions
export default notifSlice.reducer