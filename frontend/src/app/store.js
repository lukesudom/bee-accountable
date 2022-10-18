import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../components/features/auth/authSlice'
import goalReducer from '../components/features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})