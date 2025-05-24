import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const initialState = {
    user: user && user !== "null" && user !== "undefined" ? JSON.parse(user) : null,
    token: token && token !== "null" && token !== "undefined" ? token : null,
    loading: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
    },
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload)
      state.token = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const { setUser, setToken, setLoading } = profileSlice.actions

export default profileSlice.reducer
