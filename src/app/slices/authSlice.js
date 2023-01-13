import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    _id: '',
    email: '',
    username: '',
    isTutor: false
  },
  reducers: {
    initialiseStore: state => {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state._id = localStorage.getItem('_id')
        state.username = localStorage.getItem('username')
        state.email = localStorage.getItem('email')
        state.isTutor = localStorage.getItem('isTutor')
        state.interests = localStorage.getItem('interests')
      } else {
        state.token = ''
        state._id = ''
        state.email = ''
        state.username = ''
        state.isTutor = false
        state.interests = ''
      }
    },
    setUserInfo: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.user.user_id
      state._id = action.payload.user._id
      state.email = action.payload.user.email
      state.isTutor = action.payload.user.is_tutor
      state.interests = action.payload.user.interests
    },
    logout: state => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
      window.location.reload()
    }
  }
})

export const { initialiseStore, setUserInfo, logout } = authSlice.actions

export default authSlice.reducer
