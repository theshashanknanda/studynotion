import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signupData: null,
    loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setSignUpData: (state, action) => {
      state.signupData = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
  },
})

export const { setSignUpData, setLoading } = authSlice.actions

export default authSlice.reducer
