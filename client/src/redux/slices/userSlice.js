import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  user:null,
  loading:true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
        state.token = action.payload
        localStorage.setItem('token',action.payload)
      },
      logout: (state) => {
        state.token = null
        localStorage.removeItem('token')
        state.user = null
      },
      setLoading: (state, action) => {
        state.loading = action.payload
       
      },

  },
})


export const { setUser,setToken,logout,setLoading} = userSlice.actions

export default userSlice.reducer