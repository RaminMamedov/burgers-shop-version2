import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSuggestions } from "../../redux/addressSlice/asyncActioncAddress";

type Suggestion = {
  value: string;
  unrestricted_value: string;
};

type AddressState = {
  suggestions: Suggestion[];
  error: string | null | undefined;
}

const initialState: AddressState = {
  suggestions: [],
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSuggestions(state, action: PayloadAction<Suggestion[]>) {
      state.suggestions = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
  }
});

export const addressActions = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
