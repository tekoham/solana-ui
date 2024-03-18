import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalStoreState = {
  example: number;
};

const initialState: GlobalStoreState = {
  example: 0,
};

const _updateExample: CaseReducer<GlobalStoreState, PayloadAction<number>> = (
  state: { example: any; },
  action: { payload: any; }
) => {
  state.example = action.payload;
};

const _clearState: CaseReducer<GlobalStoreState> = () => initialState;

const globalStoreSlice = createSlice({
  name: "globalStoreSlice",
  initialState,
  reducers: {
    updateExample: _updateExample,
    clearState: _clearState,
  },
});

export const globalStoreActions = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
