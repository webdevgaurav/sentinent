import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./fetchStatusSlice";

const myntraStore = configureStore({
  reducer: {
    fetchStatus: fetchStatusSlice.reducer,
  },
});

export default myntraStore;
