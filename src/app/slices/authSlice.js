import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    name: '',
    _id: '',
    email: '',
  },
  reducers: {
    initialiseStore: state => {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.name = localStorage.getItem('name')
        state._id = localStorage.getItem('_id')
        state.email = localStorage.getItem('email')
      } else {
        state.token = ''
        state.name = ''
        state._id = ''
        state.email = ''
      }
    },
    setUserInfo: (state, action) => {
      state.token = action.payload.token
      state.name = action.payload.data.name
      state._id = action.payload.data._id
      state.email = action.payload.data.email
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
