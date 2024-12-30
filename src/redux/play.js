import { createSlice } from '@reduxjs/toolkit'

export const playSlice = createSlice({
  name: 'audio',
  initialState: {
    isPlaying: true,
  },
  reducers: {
    playAudio: (state) => {
      state.isPlaying = true
    },
    stopAudio: (state) => {
      state.isPlaying = false
    },
  },
})

export const { playAudio, stopAudio } = playSlice.actions

export default playSlice.reducer
