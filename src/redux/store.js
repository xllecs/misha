import { configureStore } from "@reduxjs/toolkit";
import playReducer from "./play";
import resizeReducer from "./resize";

const store = configureStore({
  reducer: {
    audio: playReducer,
    screenSize: resizeReducer,
  }
})

export { store }
