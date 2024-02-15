import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    password: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state) => {
        state.name = '',
        state.email = '',
        state.password = ''
    },
    login: (state) => {
        state.email = '',
        state.password = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { register, login } = authSlice.actions

export default authSlice.reducer