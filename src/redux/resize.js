import { createSlice } from '@reduxjs/toolkit'

export const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState: {
    isSmallScreen: false,
  },
  reducers: {
    setIsSmallScreen: (state, action) => {
      state.isSmallScreen = action.payload
    },
  },
})

export const { setIsSmallScreen } = screenSizeSlice.actions

export default screenSizeSlice.reducer
