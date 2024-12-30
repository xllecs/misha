import { createSlice } from '@reduxjs/toolkit'

export const muteSlice = createSlice({
  name: 'audio',
  initialState: {
    isMuted: false,
  },
  reducers: {
    muteAudio: (state) => {
      state.isMuted = true
    },
    unmuteAudio: (state) => {
      state.isMuted = false
    },
  },
})

export const { muteAudio, unmuteAudio } = muteSlice.actions

export default muteSlice.reducer
