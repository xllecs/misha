import { configureStore } from "@reduxjs/toolkit";
import playReducer from "./play";

const store = configureStore({
  reducer: {
    audio: playReducer
  }
})

export { store }
