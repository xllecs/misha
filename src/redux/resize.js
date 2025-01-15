import { createSlice } from '@reduxjs/toolkit'

export const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState: {
    isSmallScreen: false,
  },
  reducers: {
    setIsSmallScreen: (state) => {
      state.isSmallScreen = true
    },
  },
})

export const { setIsSmallScreen } = screenSizeSlice.actions

export default screenSizeSlice.reducer
