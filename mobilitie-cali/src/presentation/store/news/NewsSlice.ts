import { NewInterface } from "@/domain/models";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface NewsSliceInterface {
  new: NewInterface | undefined;
}
const initialState: NewsSliceInterface = {
  new: undefined,
};
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewState(state, action: PayloadAction<NewInterface | undefined>) {
      state.new = action.payload;
    },
  },
});

export const { setNewState } = newsSlice.actions;
export default newsSlice.reducer;
