import { createSlice } from "@reduxjs/toolkit";
import { BurgerSliceState, Status } from "./burgerTypes";
import { fetchBurgerById, fetchBurgers } from "./asyncActionsBurger";

const initialState: BurgerSliceState = {
  items: [],
  status: Status.LOADING,
  currentBurger: null
};

const burgersSlice = createSlice({
  name: "burgers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgers.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchBurgers.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchBurgers.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      })
      .addCase(fetchBurgerById.fulfilled, (state, action) => {
        state.currentBurger = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchBurgerById.rejected, (state) => {
        state.currentBurger = null;
        state.status = Status.ERROR;
      });
  },
});

export const burgersReducer = burgersSlice.reducer;
